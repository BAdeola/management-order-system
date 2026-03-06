import express  from "express";
import dotenv from 'dotenv';
import { poolPromise } from './config/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API Baff's está online! 🚀")
});

app.listen(PORT, async () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);

    try {
        await poolPromise;
    } catch (err) {
        console.log('Aviso: O servidor iniciou, mas a conexão com o banco falhou.');
    }
});