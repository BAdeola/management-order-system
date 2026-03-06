import type { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';

export class OrderController {
  // Colocamos o service como propriedade da classe (Padrão SOLID)
  private orderService = new OrderService();

  // Usar Arrow Function () => garante que o 'this' nunca se perca no Express
  getDashboard = async (req: Request, res: Response) => {
    try {
      const data = await this.orderService.getDashboardData();
      return res.json(data);
    } catch (error) {
      console.error('Controller Error (getDashboard):', error); // Log vital
      return res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
  };

  getOrderItems = async (req: Request, res: Response) => {
    try {
      const { codfor } = req.params;
      const vendorCode = Number(codfor);

      // Validação simples para evitar enviar lixo ao SQL Server
      if (isNaN(vendorCode)) {
        return res.status(400).json({ error: 'Código de fornecedor inválido' });
      }

      const data = await this.orderService.getMakeOrderItems(vendorCode);
      return res.json(data);
    } catch (error) {
      console.error('Controller Error (getOrderItems):', error);
      return res.status(500).json({ error: 'Erro ao buscar itens do pedido' });
    }
  };

  markNoOrder = async (req: Request, res: Response) => {
    try {
        const { codfor, tipped } = req.body;
        const vendorCode = Number(codfor);

        const result = await this.orderService.markAsNoOrderToday(vendorCode, tipped);
        return res.json(result);
    } catch (error: any) {
        // ESTA LINHA É A CHAVE: Ela manda a mensagem real do SQL para o Postman
        console.error('ERRO DETALHADO NO BACKEND:', error);
        
        return res.status(500).json({ 
        error: 'Erro no SQL Server',
        message: error.message, // A mensagem real (ex: "Invalid column name...")
        code: error.code        // O código do erro do SQL
        }
      );
    }
  };

  sendOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.orderService.sendOrder(req.body);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}