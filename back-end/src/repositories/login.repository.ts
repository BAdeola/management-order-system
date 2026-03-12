import { poolPromise } from '../config/db.js';

export class LoginRepository {
  /**
   * Busca um usuário pelas credenciais (apelido e senha)
   * Alinhado com o padrão de acesso ao banco via poolPromise
   */
  async findUserByCredentials(apelid: string, senha: string): Promise<any> {
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('apelid', apelid)
      .input('senha', senha)
      .query(`
        SELECT nomusu, apelid 
        FROM cadusu 
        WHERE apelid = @apelid AND senhas = @senha
      `);
    // Retornamos o primeiro registro (usuário) ou null caso não encontre
    return result.recordset[0] || null;
  }
}