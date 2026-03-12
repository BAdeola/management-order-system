import type { TabelaPedidosProps } from "./interfaces";
import { ActionButton } from "../../../../components/ui/Button";

// 1. Mapeamento de Cores Consolidado
const getStatusClasses = (statusValue: string | null) => {
  const status = statusValue?.trim().toUpperCase() || "";

  // VERMELHO: Pendência Total (Não foi feito nada ainda)
  if (status === "" || status === "NÃO EFETUADO" || status === "PEDIDO NÃO EFETUADO") {
    return "bg-red-500/10 text-red-500 border border-red-500/20";
  }

  // AMARELO: Em processo (Mas já bloqueado para novas ações no Front)
  if (['ABERTO', 'AGUARDANDO ENVIO', 'AGUARDANDO LIBERACAO', 'PEDIDO ESPERANDO ENVIO PARA O CD'].includes(status)) {
    return 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20';
  }

  // VERDE: Ciclo completo
  if (['FINALIZADO', 'PEDIDO ENVIADO'].includes(status)) {
    return 'bg-green-500/10 text-green-600 border border-green-500/20';
  }

  // CINZA: Encerrado (Cancelado ou Recusado)
  if (['CANCELADO', 'CANCELADA', 'NÃO TEM PEDIDO', 'RECUSADO'].includes(status)) {
    return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
  }

  return 'bg-brand/10 text-brand border border-brand/20';
};

export const TabelaPedidos = ({ orders, onMakeOrder, onDeclineOrder }: TabelaPedidosProps) => {
  return (
    <div className="bg-surface-primary border border-system-border-default backdrop-blur-xl rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        {/* O cabeçalho só faz sentido no Desktop, então escondemos no mobile */}
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-system-border-default">
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Fornecedor</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Situação</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center" />
          </tr>
        </thead>
        
        {/* No mobile, o tbody não deve forçar o layout de tabela */}
        <tbody className="flex flex-col md:table-row-group divide-y divide-system-border-default/50">
          {orders.map((order) => {
            const cleanStatus = order.orderStatus?.trim().toUpperCase() || null;
            const cleanDesc = order.statusDescription?.trim().toUpperCase() || "";
            const isPending = !cleanStatus || cleanDesc === "NÃO EFETUADO" || cleanDesc === "PEDIDO NÃO EFETUADO";
            
            const getDisplayLabel = () => {
              if (isPending) return "PEDIDO NÃO EFETUADO";
              if (cleanStatus === "NÃO TEM PEDIDO") return "RECUSADO";
              if (cleanStatus === "AGUARDANDO ENVIO") return "PEDIDO ENVIADO";
              if (cleanStatus === "ABERTO") return "PEDIDO EM ABERTO";
              return order.statusDescription || cleanStatus;
            };

            return (
              /* TR: Vira um container flexível no mobile para empilhar os itens */
              <tr key={order.vendorCode} className="flex flex-col md:table-row hover:bg-brand/5 transition-colors group p-4 md:p-0 gap-3 md:gap-0">
                
                {/* 1. Fornecedor: Sempre no topo */}
                <td className="md:p-6 block md:table-cell">
                  <div className="flex flex-col">
                    <span className="text-system-text-primary font-bold text-lg md:text-base">
                      {order.vendorName}
                    </span>
                    <span className="text-[10px] text-system-text-muted uppercase tracking-tighter">
                      Cod: {order.vendorCode}
                    </span>
                  </div>
                </td>

                {/* 2. Situação: Abaixo do fornecedor no mobile */}
                <td className="md:p-6 block md:table-cell md:text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block whitespace-nowrap ${getStatusClasses(cleanStatus || cleanDesc)}`}>
                    {getDisplayLabel()}
                  </span>
                </td>

                {/* 3. Ações: No final da "pilha" no mobile */}
                <td className="md:p-6 block md:table-cell">
                  {isPending ? (
                    /* Botões ocupam largura total no mobile para facilitar o toque */
                    <div className="flex items-center justify-center md:justify-center gap-2 w-full">
                      <ActionButton variant="primary" onClick={() => onMakeOrder(order)} className="flex-1 md:flex-none">
                        Fazer Pedido
                      </ActionButton>
                      <ActionButton variant="secondary" onClick={() => onDeclineOrder(order)} className="flex-1 md:flex-none">
                        Recusar
                      </ActionButton>
                    </div>
                  ) : (
                    <div className="text-center md:text-center py-2 md:py-0">
                      <span className="text-xs text-system-text-muted uppercase font-bold tracking-widest flex items-center justify-center gap-1 opacity-90">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        Resolvido
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaPedidos;