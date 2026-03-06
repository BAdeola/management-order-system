import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: mssql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false, // Obrigatório para SQL 2005
        trustServerCertificate: true, // Evita erros de SSL em bancos legados
        enableArithAbort: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

export const poolPromise = new mssql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('✅ Conectado ao SQL Server com sucesso!');
    return pool;
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no Banco de Dados:', err);
    throw err;
});