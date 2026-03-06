import { poolPromise } from '../config/db.js';

export class ProductRepository {
  // Alinhado com o nome que você usou na linha 58 do Service
  async getProductsForNewOrder(codfor: number): Promise<any[]> {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codfor', codfor)
      .query(`
        SELECT cp.codpro, cp.nompro, cp.unisai, cp.qtdsai, cf.nomfor
        FROM cadpro cp
        LEFT OUTER JOIN cadfor cf ON cf.codfor = cp.codfor
        WHERE cp.situac = 'ATIVO' AND cp.fora_de_linha = 0 AND cp.codfor = @codfor
        ORDER BY cf.nomfor, cp.nompro
      `);
    return result.recordset;
  }
}