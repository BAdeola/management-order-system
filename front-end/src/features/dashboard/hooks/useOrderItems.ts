import { useState, useEffect } from 'react';
import { dashboardApi } from '../../../services/api';

export function useOrderItems(vendorCode: number | null) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!vendorCode) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await dashboardApi.getOrderItems(vendorCode);
        setItems(data);
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [vendorCode]);

  return { items, setItems, loading };
}