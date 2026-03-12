import { Router } from 'express';
import { LoginController } from '../controllers/login.controller.js';

const router = Router();
const loginController = new LoginController();

// Rota de POST para o Login
router.post('/', (req, res) => loginController.handle(req, res));

export default router;