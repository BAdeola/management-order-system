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
    <div className="bg-surface-primary border border-system-border-default backdrop-blur-xl rounded-2xl shadow-sm overflow-x-auto custom-scrollbar">
      {/* table-fixed: Força o navegador a respeitar as larguras que definirmos.
        min-w-[800px]: Garante que em telas muito pequenas a tabela não vire um "acordeão", permitindo scroll horizontal.
      */}
      <table className="w-full text-left border-collapse table-fixed min-w-175 md:min-w-full">
        <thead>
          <tr className="border-b border-system-border-default">
            {/* Largura flexível: Fornecedor ocupa o que sobrar */}
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">
              Fornecedor
            </th>
            
            {/* Larguras fixas para colunas de dados curtos */}
            <th className="w-30 p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center hidden sm:table-cell">
              Data
            </th>
            
            <th className="w-45 p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">
              Situação
            </th>
            
            <th className="w-35 p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center hidden lg:table-cell">
              Criado Por
            </th>
            
            {/* Ações precisa de espaço para os dois botões */}
            <th className="w-55 p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">
              Ações
            </th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-system-border-default/50">
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
              <tr key={order.vendorCode} className="hover:bg-brand/5 transition-colors group">
                <td className="p-6 overflow-hidden">
                  <div className="flex flex-col">
                    <span className="text-system-text-primary font-bold truncate" title={order.vendorName}>
                      {order.vendorName}
                    </span>
                    <span className="text-[10px] text-system-text-muted uppercase tracking-tighter">
                      Cod: {order.vendorCode}
                    </span>
                  </div>
                </td>

                <td className="p-6 text-center text-system-text-secondary text-sm hidden sm:table-cell whitespace-nowrap">
                  {order.dateLabel}
                </td>

                <td className="p-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block whitespace-nowrap ${getStatusClasses(cleanStatus || cleanDesc)}`}>
                    {getDisplayLabel()}
                  </span>
                </td>

                <td className="p-6 text-center text-system-text-secondary text-sm hidden lg:table-cell">
                  {order.createdBy || '-'}
                </td>

                <td className="p-6">
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <ActionButton variant="primary" onClick={() => onMakeOrder(order)}>
                        Fazer
                      </ActionButton>
                      <ActionButton variant="secondary" onClick={() => onDeclineOrder(order)}>
                        Recusar
                      </ActionButton>
                    </div>
                  ) : (
                    <div className="text-center">
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