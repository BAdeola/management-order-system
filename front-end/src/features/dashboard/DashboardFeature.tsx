import { useDashboardData } from "./hooks/useDashboardData";
import { TabelaPedidos } from "./components/TabelaPedidos/TabelaPedidos";
import { StatusCard } from "./components/StatusCard/StatusCard";
import { TabelaItens } from "./components/TabelaItens/TabelaItens";
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal";

export const DashboardFeature = () => {
  const {
    data, loading, error, loadingItems, items, stats,
    selectedVendor, setSelectedVendor,
    vendorToDecline, setVendorToDecline,
    handleUpdateQty, handleConfirmDecline, handleSendOrder
  } = useDashboardData();

  if (loading) return (
    <div className="p-10 text-brand animate-pulse font-black uppercase tracking-widest text-center">
      Sincronizando com SQL Server 2005...
    </div>
  );

  if (error) return (
    <div className="p-10 text-red-500 font-bold border border-red-500/20 rounded-xl bg-red-500/5">
      Falha na conexão: {error}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen bg-transparent">
      {/* 1. Métricas Globais */}
      <div className="flex gap-4">
        <StatusCard label="Fornecedores Liberados" value={stats.total} />
        <StatusCard label="Ações Concluídas" value={stats.concluidos} />
        <StatusCard label="Aguardando" value={stats.pendentes} />
      </div>

      {/* 2. Tabela de Trabalho */}
      <TabelaPedidos 
        orders={data} 
        onMakeOrder={setSelectedVendor} 
        onDeclineOrder={setVendorToDecline}
      />

      {/* 3. Modal de Pedido (Quantidades) */}
      <TabelaItens
        isOpen={!!selectedVendor}
        isLoading={loadingItems}
        vendorName={selectedVendor?.vendorName}
        items={items}
        onClose={() => setSelectedVendor(null)}
        onSave={handleUpdateQty}
        onConfirmSend={handleSendOrder}
      />

      {/* 4. Modal de Confirmação (Recusa) */}
      <ConfirmationModal 
        isOpen={!!vendorToDecline}
        title="Confirmar Recusa"
        message={`Deseja marcar "${vendorToDecline?.vendorName}" como SEM PEDIDO hoje?`}
        confirmText="Confirmar Recusa"
        cancelText="Voltar"
        onClose={() => setVendorToDecline(null)}
        onConfirm={handleConfirmDecline}
      />
    </div>
  );
};