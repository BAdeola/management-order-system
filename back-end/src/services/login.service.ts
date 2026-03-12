import { LoginRepository } from '../repositories/login.repository.js';

export class LoginService {
  private repository = new LoginRepository();

  async execute(apelid: string, senha: string) {
    // Busca no banco através do Repository que criamos
    const user = await this.repository.findUserByCredentials(apelid, senha);

    // Se o banco retornar null ou undefined, as credenciais estão erradas
    if (!user) {
      throw new Error('Usuário ou senha inválidos.');
    }

    // Retornamos apenas o que é necessário para o Front (o nome para o Dashboard)
    return {
      nome: user.nomusu,
      apelido: user.apelid
    };
  }
}