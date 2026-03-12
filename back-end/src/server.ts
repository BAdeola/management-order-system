import express, { type Request, type Response, type NextFunction } from "express"; // Corrigido de 'react' para 'express'
import dotenv from 'dotenv';
import { poolPromise } from './config/db.js';
import orderRoutes from "./routes/order.routes.js";
import loginRoutes from "./routes/login.routes.js";
import cors from 'cors';

dotenv.config();

const app = express();

// 1. Configurações Iniciais
app.use(cors({
    origin: process.env.FRONT_END_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 2. Rotas
app.get('/', (req: Request, res: Response) => {
    res.send("API Baff's está online! 🚀")
});

app.use('/orders', orderRoutes);
app.use('/login', loginRoutes);

// 3. Middleware de Erro Global (Tipado corretamente)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Erro interno:', err.stack);
    res.status(500).json({ message: 'Algo deu errado no servidor!' });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, async () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    try {
        await poolPromise;
        console.log('✅ Conexão com SQL Server estabelecida com sucesso.');
    } catch (err: any) {
        console.error('⚠️ Erro crítico: Falha ao conectar no banco de dados.', err.message);
    }
});