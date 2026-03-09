import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Order } from '../components/TabelaPedidos/interfaces.js';
import { dashboardApi } from '../../../services/api.ts';
import { useOrderItems } from './useOrderItems';

export function useDashboardData() {
  // --- Estados de Dados ---
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Estados de Controle de Modais ---
  const [selectedVendor, setSelectedVendor] = useState<Order | null>(null);
  const [vendorToDecline, setVendorToDecline] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Hook de Itens Integrado ---
  const { items, setItems, loading: loadingItems } = useOrderItems(selectedVendor?.vendorCode || null);

  // --- Busca de Dados ---
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await dashboardApi.getOrders();
      setData(result as Order[]);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Handlers (Lógica de Negócio) ---

  const handleUpdateQty = (index: number, qty: number) => {
    const newItems = [...items];
    newItems[index].quantity = qty;
    setItems(newItems);
  };

  const handleConfirmDecline = async () => {
    if (!vendorToDecline || isSubmitting) return;
    
    setIsSubmitting(true); // Trava os botões
    try {
      await dashboardApi.markNoOrder(vendorToDecline.vendorCode, vendorToDecline.orderType);
      setVendorToDecline(null);
      await fetchData(); 
    } catch (err) {
      alert("Erro ao processar.");
    } finally {
      setIsSubmitting(false); // Libera após terminar
    }
  };

  const handleSendOrder = async () => {
  // Verificações de segurança antes de disparar para o banco legado
  if (!selectedVendor || isSubmitting) return;

  setIsSubmitting(true);
    try {
      // Aqui montamos o objeto real que o Back-end espera
      await dashboardApi.sendOrder({
        codfor: selectedVendor.vendorCode,
        tipped: selectedVendor.orderType,
        // Filtramos para enviar apenas produtos onde a quantidade é maior que 0
        items: items
          .filter((item) => item.quantity > 0)
          .map((item) => ({
            productCode: item.productCode,
            quantity: item.quantity,
          })),
      });

      // Se chegou aqui, deu certo! Limpamos o estado e atualizamos a lista
      setSelectedVendor(null);
      await fetchData(); 
      
      // Opcional: Um feedback visual simples
      console.log("Pedido enviado com sucesso para o SQL Server 2005!");

    } catch (err: any) {
      console.error("Erro na gravação do pedido:", err);
      alert(err.response?.data?.error || "Erro ao enviar pedido. Verifique os logs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Métricas Calculadas (Memoized para performance) ---
  const stats = useMemo(() => {
    const total = data.length;
    const concluidos = data.filter(o => o.orderStatus === 'FINALIZADO' || o.orderStatus === 'NÃO TEM PEDIDO').length;
    return {
      total,
      concluidos,
      pendentes: total - concluidos
    };
  }, [data]);

  return {
    // Dados e Status
    data,
    loading,
    error,
    loadingItems,
    items,
    stats,
    
    // Estados de Seleção
    isSubmitting,
    selectedVendor,
    setSelectedVendor,
    vendorToDecline,
    setVendorToDecline,
    
    // Funções de Ação
    handleUpdateQty,
    handleConfirmDecline,
    handleSendOrder,
    refresh: fetchData
  };
}