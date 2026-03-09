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
    }
};