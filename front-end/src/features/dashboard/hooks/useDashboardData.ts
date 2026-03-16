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
  const canSendOrder = useMemo(() => {
    return items.some(item => item.quantity > 0);
  }, [items]);

  // --- Busca de Dados ---
  const fetchData = useCallback(async (isSilent = false) => {
    try {
      // isSilent serve para atualizar em background sem mostrar o 
      // "Carregando..." gigante na tela, se você preferir.
      if (!isSilent) setLoading(true); 
      
      const result = await dashboardApi.getOrders();
      setData(result as Order[]);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Busca inicial
    fetchData();

    // Configura o intervalo para atualizar a cada 30 minutos
    const TRINTA_MINUTOS = 30 * 60 * 1000;
    const interval = setInterval(() => {
      console.log("Polling: Atualizando dados silenciosamente...");
      fetchData(true); // isSilent = true para não mostrar o loading na tela toda
    }, TRINTA_MINUTOS);

    // Limpeza: remove o intervalo se o gerente fechar o dashboard
    return () => clearInterval(interval);
  }, [fetchData]);

  // 2. Refresh ao Voltar para a Aba (Focus)
  useEffect(() => {
    const handleFocus = () => {
      console.log("Focus: Gerente voltou, atualizando...");
      fetchData(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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
    const pendentes = data.filter(o => {
      const rawStatus = o.orderStatus?.trim().toUpperCase() || "";
      const rawDesc = o.statusDescription?.trim().toUpperCase() || "";
      // Segue a mesma lógica da tabela: é pendente se não tem pedido feito
      return !rawStatus || rawDesc === "NÃO EFETUADO" || rawDesc === "PEDIDO NÃO EFETUADO";
    }).length;

    return {
      total,
      pendentes,
      concluidos: total - pendentes
    };
  }, [data]);

  // Centralização visual para estados de loading/error
  const selectedStatus = selectedVendor?.orderStatus?.trim().toUpperCase() || "";
  const isReadOnly = ['FINALIZADO', 'PEDIDO ENVIADO', 'AGUARDANDO ENVIO', 'PEDIDO ESPERANDO ENVIO PARA O CD'].includes(selectedStatus);

  return {
    // Dados e Status
    data,
    loading,
    error,
    loadingItems,
    items,
    stats,
    canSendOrder,
    
    // Estados de Seleção
    isSubmitting,
    selectedVendor,
    setSelectedVendor,
    vendorToDecline,
    setVendorToDecline,
    isReadOnly,
    
    // Funções de Ação
    handleUpdateQty,
    handleConfirmDecline,
    handleSendOrder,
    refresh: fetchData
  };
}