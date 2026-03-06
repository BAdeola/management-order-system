import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';

const router = Router();
const orderController = new OrderController();

// 1. Rota para carregar o Dashboard principal
router.get('/dashboard', orderController.getDashboard);

// 2. Rota para buscar itens de um fornecedor específico (Fazer Pedido)
// O ':codfor' é um parâmetro dinâmico que o controller lê via req.params
router.get('/make-order/:codfor', orderController.getOrderItems);

// 3. Rota para executar a rotina de "Não tem pedido hoje"
router.post('/no-order', orderController.markNoOrder);

// 4. Rota para enviar as quantidades de itens por produtos do pedido e salvar nas tabelas pedido_cd1 e pedido_cd
router.post('/send', orderController.sendOrder);

export default router;