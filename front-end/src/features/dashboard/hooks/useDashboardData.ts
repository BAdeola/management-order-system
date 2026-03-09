import { useState, useEffect, useCallback } from 'react';
import type { Order } from '../components/TabelaPedidos/interfaces.js';
import { dashboardApi } from '../../../services/api.ts';

export function useDashboardData() {
    const [data, setData] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Usamos useCallback para que a função refresh possa ser passada para componentes 
    // sem causar renderizações infinitas
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const result = await dashboardApi.getOrders();
            
            // Como o back já manda TableOrderRow e o front espera Order (que são iguais)
            // nós apenas garantimos a tipagem:
            setData(result as Order[]); 
            
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refresh: fetchData };
}