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
    handleUpdateQty, handleConfirmDecline, handleSendOrder, canSendOrder
  } = useDashboardData();

  // Centralização visual para estados de loading/error
  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center p-10 text-brand animate-pulse font-black uppercase tracking-widest text-center">
      Sincronizando com SQL Server 2005...
    </div>
  );

  if (error) return (
    <div className="m-8 p-10 text-red-500 font-bold border border-red-500/20 rounded-xl bg-red-500/5">
      Falha na conexão: {error}
    </div>
  );

  return (
    /* 1. Removemos o min-h-screen (para respeitar o scroll interno do pai)
      2. P-4 no mobile, P-8 no desktop
    */
    <div className="flex flex-col gap-6 md:gap-8 p-4 md:p-8 w-full max-w-7xl mx-auto bg-transparent">
      
      {/* 1. Métricas Globais: Agora usando Grid Responsivo */}
      {/* 1. Métricas Globais: Forçando 3 colunas no mobile */}
      <div className="grid grid-cols-3 gap-2 md:gap-8">
        <StatusCard label="Fornecedores Liberados" value={stats.total} />
        <StatusCard label="Ações Concluídas" value={stats.concluidos} />
        <StatusCard label="Aguardando" value={stats.pendentes} />
      </div>

      {/* 2. Tabela de Trabalho: 
          Envelopada em um container com overflow para não quebrar o layout no celular 
      */}
      <div className="w-full overflow-hidden">
        <TabelaPedidos 
          orders={data} 
          onMakeOrder={setSelectedVendor} 
          onDeclineOrder={setVendorToDecline}
        />
      </div>

      {/* 3. Modal de Pedido (Quantidades) */}
      <TabelaItens
        isOpen={!!selectedVendor}
        isLoading={loadingItems}
        vendorName={selectedVendor?.vendorName}
        items={items}
        onClose={() => setSelectedVendor(null)}
        onSave={handleUpdateQty}
        onConfirmSend={handleSendOrder}
        canSend={canSendOrder}
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