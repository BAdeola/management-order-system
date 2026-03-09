// src/features/dashboard/DashboardFeature.tsx
import { useDashboardData } from "./hooks/useDashboardData";
import { TabelaPedidos } from "./components/TabelaPedidos/TabelaPedidos";
import { StatusCard } from "./components/StatusCard/StatusCard";
import { TabelaItens } from "./components/TabelaItens/TabelaItens";
import { useState } from "react";
import { useOrderItems } from "./hooks/useOrderItems";

export const DashboardFeature = () => {
  const { data, loading, error } = useDashboardData();
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const { items, setItems, loading: loadingItems } = useOrderItems(selectedVendor?.vendorCode);

  if (loading) return <div className="p-10 text-brand animate-pulse">Carregando dados do servidor...</div>;
  if (error) return <div className="p-10 text-red-500">Erro: {error}</div>;

  // Calculando métricas simples para os StatusCards
  const totalFornecedores = data.length;
  const pedidosAbertos = data.filter(o => o.orderStatus === 'ABERTO').length;
  

  const handleUpdateQty = (index: number, qty: number) => {
    const newItems = [...items];
    newItems[index].quantity = qty;
    setItems(newItems);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex gap-4">
        <StatusCard label="Fornecedores Hoje" value={totalFornecedores.toString()} />
        <StatusCard label="Pedidos em Aberto" value={pedidosAbertos.toString()} />
      </div>

      <TabelaPedidos 
        orders={data} 
        onMakeOrder={(order) => setSelectedVendor(order)} 
      />

      <TabelaItens
        isOpen={!!selectedVendor}
        vendorName={selectedVendor?.vendorName}
        items={items}
        onClose={() => setSelectedVendor(null)}
        onSave={handleUpdateQty}
      />
    </div>
  );
};