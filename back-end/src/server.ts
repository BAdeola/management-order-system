import express  from "express";
import dotenv from 'dotenv';
import { poolPromise } from './config/db.js';
import orderRoutes from "./routes/order.routes.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONT_END_URL
}));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API Baff's está online! 🚀")
});

// Prefixo global para as rotas de pedidos
app.use('/orders', orderRoutes);

app.listen(PORT, async () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    try {
        await poolPromise;
    } catch (err) {
        console.log('Aviso: O servidor iniciou, mas a conexão com o banco falhou.');
    }
});