import { poolPromise } from '../config/db.js';
import { OrderRepository } from '../repositories/order.repository.js';
import mssql from 'mssql';
import { ProductRepository } from '../repositories/product.repository.js';
import type { OrderItemRow } from '../models/OrderItem.js';
import type { TableOrderRow } from '../models/TableOrder.js';
import { SupplierRepository } from '../repositories/supplier.repository.js';
import type { SendOrderRequest } from '../models/OrderRequest.js';

export class OrderService {
    private orderRepo = new OrderRepository();
    private productRepo = new ProductRepository();
    // 2. INICIALIZE O REPOSITÓRIO QUE ESTAVA FALTANDO
    private supplierRepo = new SupplierRepository(); 

    async getDashboardData(): Promise<TableOrderRow[]> {
        // 3. Agora o 'this.supplierRepo' vai funcionar!
        const allowedSuppliers = await this.supplierRepo.getAllowedSuppliersToday();
        const todayLabel = new Date().toLocaleDateString('pt-BR');

        const tableData: TableOrderRow[] = await Promise.all(
            // 4. TIPAGEM DO PARÂMETRO: Adicione ': any' para resolver o erro ts(7006)
            allowedSuppliers.map(async (supplier: any) => {
                const orders = await this.orderRepo.getOrdersBySupplierToday(supplier.codfor);
                const order = orders[0];

                let statusDescription = "";
                
                if (!order) {
                    statusDescription = "PEDIDO NÃO EFETUADO";
                } else {
                    if (order.situac === "NÃO TEM PEDIDO") {
                        if (order.sincronizado?.toUpperCase() === "N") {
                            statusDescription = "AGUARDANDO ENVIO";
                        } else {
                            statusDescription = "FINALIZADO";
                        }
                    } else {
                        statusDescription = `PEDIDO Nº ${order.numero} GERADO - STATUS ATUAL : ${order.situac}`;
                    }
                }

                return {
                    vendorName: supplier.nomfor,
                    statusDescription,
                    vendorCode: supplier.codfor,
                    orderType: order?.tipped || "",
                    rawDate: order?.dataOriginal || null,
                    orderNumber: order?.numero || null,
                    vendorType: supplier.tipfor,
                    orderStatus: order?.situac || "NÃO EFETUADO"
                };
            })
        );

        return tableData;
    }
    
    async markAsNoOrderToday(codfor: number, tipped: string) {
        const pool = await poolPromise;
        const transaction = new mssql.Transaction(pool);

        try {
            await transaction.begin();

            // 1. Verifica se existe pedido aberto
            const openOrderResult = await this.orderRepo.findOpenOrderToday(transaction, codfor);
            let orderNumber: number;

            if (openOrderResult.recordset.length > 0) {
                orderNumber = openOrderResult.recordset[0].numero;

                // 2. Deleta o que está aberto (como no COBOL)
                await this.orderRepo.deleteOrderAndItems(transaction, orderNumber);
                await this.orderRepo.insertLog(transaction, orderNumber, 'EXCLUIDO O PEDIDO EM ABERTO PARA INCLUIR COMO SEM PEDIDO');
            } else {
                // 3. Se não existe, pega o próximo número
                orderNumber = await this.orderRepo.getNextOrderNumber(transaction);
            }

            // 4. Insere o registro de "NÃO TEM PEDIDO"
            await this.orderRepo.insertNoOrderRecord(transaction, { numero: orderNumber, tipped, codfor });
            await this.orderRepo.insertLog(transaction, orderNumber, 'INCLUIDO COMO SEM PEDIDO PARA A DATA');

            await transaction.commit(); // O "exec sql commit" do COBOL
            return { success: true, orderNumber };

        } catch (error) {
            await transaction.rollback();
            console.error("Erro na rotina de 'Não tem pedido':", error);
            throw error;
        }
    }

    async getMakeOrderItems(codfor: number): Promise<OrderItemRow[]> {
        const openOrder = await this.orderRepo.getOpenOrderId(codfor);

        // Tipamos o array como 'any[]' para resolver o erro da linha 62
        let rawItems: any[] = []; 

        if (openOrder) {
            rawItems = await this.orderRepo.getExistingOrderItems(openOrder.numero);
        } else {
            rawItems = await this.productRepo.getProductsForNewOrder(codfor);
        }

        return rawItems.map((item: any) => ({ // Agora o TS sabe lidar com o 'item'
            vendorName: item.nomfor,
            productCode: item.codpro,
            productName: item.nompro,
            unitLiteral: `${item.unisai.trim()} C/ ${Number(item.qtdsai).toFixed(4)}`.replace('.', ','),
            quantity: item.quanti || 0 
        }));
    }

    async sendOrder(orderData: SendOrderRequest) {
        // 1. Validação: Pelo menos um item deve ter quantidade > 0
        const hasValidItem = orderData.items.some(item => item.quantity > 0);

        if (!hasValidItem) {
            throw new Error('Não é possível emitir pedido com todas as linhas zeradas.');
        }

        const pool = await poolPromise;
        const transaction = new mssql.Transaction(pool);

        try {
            await transaction.begin();

            // 2. Verifica se já existe um pedido ABERTO hoje
            let openOrder = await this.orderRepo.getOpenOrderId(orderData.codfor);
            let orderNumber: number;

            if (!openOrder) {
                // 3. Se não existe, cria novo pedido (Master-Detail)
                orderNumber = await this.orderRepo.getNextOrderNumber(transaction);
                await this.orderRepo.createOrderHeader(transaction, {
                    numero: orderNumber,
                    tipped: orderData.tipped,
                    codfor: orderData.codfor
                });
                
                // Inicializa a tabela de itens com 0 para todos os produtos do fornecedor
                await this.orderRepo.initializeOrderItems(transaction, orderNumber, orderData.codfor);
                await this.orderRepo.insertLog(transaction, orderNumber, 'INCLUIDO');
            } else {
                orderNumber = openOrder.numero;
            }

            // 4. Atualiza as quantidades dos itens enviados pelo gerente
            for (const item of orderData.items) {
                await this.orderRepo.updateItemQuantity(transaction, orderNumber, item.productCode, item.quantity);
            }

            await transaction.commit();
            return { success: true, orderNumber };

        } catch (error) {
            console.error("Erro na rotina de 'SendPedido':", error);
            await transaction.rollback();
            throw error;
        }
    }
}