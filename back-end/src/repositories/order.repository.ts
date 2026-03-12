import { poolPromise } from '../config/db.js';
import type { OrderCD } from '../models/OrderCD.js';
import mssql from 'mssql';

export class OrderRepository {
  // Busca pedido aberto hoje para o fornecedor
  async findOpenOrderToday(transaction: mssql.Transaction, codfor: number) {
    const request = new mssql.Request(transaction);
    return request
      .input('codfor', mssql.Int, codfor)
      .query(`
        SELECT numero FROM pedido_cd 
        WHERE codfor = @codfor 
        AND situac = 'ABERTO' 
        AND DATEDIFF(day, data, GETDATE()) = 0
      `);
  }

  // Deleta pedido e itens (SQL 2005 não tem Cascade automático confiável em sistemas legados)
  async deleteOrderAndItems(transaction: mssql.Transaction, numero: number) {
    const request = new mssql.Request(transaction);
    request.input('numero', mssql.Int, numero);
    await request.query(`DELETE FROM pedido_cd_itens WHERE numero = @numero`);
    await request.query(`DELETE FROM pedido_cd WHERE numero = @numero`);
  }

  // Busca o próximo número (Simulando o ADD 1 TO MAX do COBOL)
  async getNextOrderNumber(transaction: mssql.Transaction) {
    const request = new mssql.Request(transaction);
    const result = await request.query(`SELECT ISNULL(MAX(numero), 0) + 1 as next FROM pedido_cd`);
    return result.recordset[0].next;
  }

  // Insere o registro de "NÃO TEM PEDIDO"
  async insertNoOrderRecord(transaction: mssql.Transaction, data: any) {
    const request = new mssql.Request(transaction);
    return request
      // Usamos Decimal(6,0) para bater com o numeric(6,0) do seu DDL
      .input('numero', mssql.Decimal(6, 0), data.numero)
      .input('tipped', mssql.VarChar(20), data.tipped) // Exatamente o tamanho do DDL
      .input('codfor', mssql.Decimal(6, 0), data.codfor)
      .query(`
        INSERT INTO pedido_cd (numero, data, situac, datetime_situac, tipped, codfor, criado_por, sincronizado)
        VALUES (@numero, GETDATE(), 'NÃO TEM PEDIDO', GETDATE(), @tipped, @codfor, 'LOJA', 'N')
      `);
  }

  // Grava LOG (Log_pedido_cd)
  async insertLog(transaction: mssql.Transaction, numero: number, message: string) {
    const request = new mssql.Request(transaction);
    return request
      .input('numero', mssql.Int, numero)
      .input('msg', mssql.VarChar, message)
      .query(`INSERT INTO log_pedido_cd (numero, data, situac) VALUES (@numero, GETDATE(), @msg)`);
  }

  async getOpenOrderId(codfor: number): Promise<{ numero: number } | null> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codfor', codfor)
      .query(`
        SELECT numero FROM pedido_cd 
        WHERE codfor = @codfor AND situac = 'ABERTO' 
        AND DATEDIFF(day, data, GETDATE()) = 0
      `);
    return result.recordset[0] || null;
  }

  // Adicione este para buscar os itens salvos
  async getExistingOrderItems(numero: number): Promise<any[]> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('numero', numero)
      .query(`
        SELECT pi.codpro, cp.nompro, cp.unisai, cp.qtdsai, pi.quanti, cf.nomfor
        FROM pedido_cd_itens pi
        LEFT OUTER JOIN cadpro cp ON cp.codpro = pi.codpro
        LEFT OUTER JOIN cadfor cf ON cp.codfor = cf.codfor
        WHERE pi.numero = @numero
        ORDER BY cf.nomfor, cp.nompro
      `);
    return result.recordset;
  }

  // Aqui pegamos os pedidos por fornecedor que devem ser feitos no dia de hoje
  async getOrdersBySupplierToday(codfor: number): Promise<any[]> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codfor', mssql.Int, codfor)
      .query(`
        SELECT 
          numero, 
          situac, 
          sincronizado, 
          tipped
        FROM pedido_cd
        WHERE codfor = @codfor 
          AND criado_por = 'LOJA'
          AND DATEDIFF(day, data, GETDATE()) = 0
      `);
    return result.recordset;
  }

  // Cria o cabeçalho do pedido (pedido_cd)
  async createOrderHeader(transaction: mssql.Transaction, data: any) {
    const request = new mssql.Request(transaction);
    return request
      .input('numero', mssql.Decimal(6, 0), data.numero)
      .input('tipped', mssql.VarChar(20), data.tipped)
      .input('codfor', mssql.Decimal(6, 0), data.codfor)
      .query(`
        INSERT INTO pedido_cd (numero, data, situac, datetime_situac, tipped, codfor, criado_por, sincronizado)
        VALUES (@numero, GETDATE(), 'AGUARDANDO ENVIO', GETDATE(), @tipped, @codfor, 'LOJA', 'N')
      `);
  }

  // Inicializa os itens do pedido com quantidade 0 (pedido_cd_itens)
  // Baseado no seu SELECT FROM cadpro do COBOL
  async initializeOrderItems(transaction: mssql.Transaction, orderNumber: number, codfor: number) {
    const request = new mssql.Request(transaction);
    return request
      .input('numero', mssql.Decimal(6, 0), orderNumber)
      .input('codfor', mssql.Decimal(6, 0), codfor)
      .query(`
        INSERT INTO pedido_cd_itens (numero, codpro, quanti, qtd_a_receber, codfor, cusmed, unisai, qtdsai)
        SELECT @numero, codpro, 0, 0, @codfor, 0, unisai, qtdsai
        FROM cadpro 
        WHERE situac = 'ATIVO' AND fora_de_linha = 0 AND codfor = @codfor
      `);
  }

  // Atualiza a quantidade de um item específico
  async updateItemQuantity(transaction: mssql.Transaction, orderNumber: number, productCode: number, quantity: number) {
    const request = new mssql.Request(transaction);
    return request
      .input('numero', mssql.Decimal(6, 0), orderNumber)
      .input('codpro', mssql.Int, productCode)
      .input('quanti', mssql.Decimal(12, 4), quantity)
      .query(`
        UPDATE pedido_cd_itens 
        SET quanti = @quanti 
        WHERE numero = @numero AND codpro = @codpro
      `);
  }
}