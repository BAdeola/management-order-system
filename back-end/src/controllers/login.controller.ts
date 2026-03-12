import type { Request, Response } from 'express';
import { LoginService } from '../services/login.service.js';

export class LoginController {
  private service = new LoginService();

  async handle(req: Request, res: Response) {
    try {
      const { apelid, senha } = req.body;

      // Validação básica de entrada
      if (!apelid || !senha) {
        return res.status(400).json({ message: 'Apelido e senha são obrigatórios.' });
      }

      const user = await this.service.execute(apelid, senha);

      // Sucesso! Retornamos o nome que vai aparecer no "Olá, Brayan"
      return res.json(user);

    } catch (error: any) {
      // Se for o erro de "Usuário ou senha inválidos", mandamos 401 (Unauthorized)
      return res.status(401).json({ message: error.message });
    }
  }
}