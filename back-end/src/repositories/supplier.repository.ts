import { poolPromise } from '../config/db.js';
import type { SupplierOrderPermission } from '../models/Supplier.js';

export class SupplierRepository {
  async getAllowedSuppliersToday(): Promise<SupplierOrderPermission[]> {
    const pool = await poolPromise;
    
    // A lógica do CASE mapeia o número do dia da semana para a coluna correta
    // SQL Server 2005: 1=Dom, 2=Seg, 3=Ter, 4=Qua, 5=Qui, 6=Sex, 7=Sab
    const query = `
      SELECT 
        p.codfor, 
        c.nomfor, 
        c.tipfor
      FROM cadpar_pedido p
      INNER JOIN cadfor c ON c.codfor = p.codfor
      WHERE 1 = CASE DATEPART(dw, GETDATE())
        WHEN 2 THEN p.segunda
        WHEN 3 THEN p.terca
        WHEN 4 THEN p.quarta
        WHEN 5 THEN p.quinta
        WHEN 6 THEN p.sexta
        WHEN 7 THEN p.sabado
        ELSE 0 -- Domingo (1) geralmente não há pedidos
      END
      ORDER BY c.nomfor
    `;

    const result = await pool.request().query(query);
    return result.recordset;
  }
}