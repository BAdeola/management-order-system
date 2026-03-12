import axios from 'axios';

// Pegamos a URL do seu .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Criamos uma instância personalizada do Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos (segurança para o SQL 2005 lento)
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- AUTENTICAÇÃO ---
export const authApi = {
    
    async login(apelid: string, senha: string): Promise<{ nome: string; apelido: string }> {
        // Chamada para a rota que configuramos no Express
        const response = await api.post('/login', { apelid, senha });
        return response.data;
    },

    logout() {
        localStorage.removeItem('@Baffs:user');
        window.location.href = import.meta.env.BASE_URL; // Redireciona bruto para resetar o estado
    }
};

// --- DASHBOARD ---
export const dashboardApi = {
    async getOrders(): Promise<any[]> {
        const response = await api.get('/orders/dashboard');
        return response.data;
    },

    async getOrderItems(codfor: number): Promise<any[]> {
        const response = await api.get(`/orders/make-order/${codfor}`);
        return response.data;
    },

    async sendOrder(orderData: { codfor: number; tipped: string; items: any[] }) {
        const response = await api.post('/orders/send', orderData);
        return response.data;
    },

    async markNoOrder(codfor: number, tipped: string) {
        return api.post('/orders/no-order', { codfor, tipped });
    }
};