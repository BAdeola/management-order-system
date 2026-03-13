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

            // Flags de estado
            const isPending = !cleanStatus || cleanDesc === "NÃO EFETUADO" || cleanDesc === "PEDIDO NÃO EFETUADO";
            const isSent = ['FINALIZADO', 'PEDIDO ENVIADO', 'AGUARDANDO ENVIO', 'PEDIDO ESPERANDO ENVIO PARA O CD'].includes(cleanStatus || "");

            const getDisplayLabel = () => {
                if (isPending) return "PEDIDO NÃO EFETUADO";
                if (cleanStatus === "NÃO TEM PEDIDO") return "RECUSADO";
                if (cleanStatus === "AGUARDANDO ENVIO") return "PEDIDO ENVIADO";
                if (cleanStatus === "ABERTO") return "PEDIDO EM ABERTO";
                return order.statusDescription || cleanStatus;
            };

            return (
              <tr key={order.vendorCode} className="flex flex-col md:table-row hover:bg-brand/5 transition-colors group p-4 md:p-0 gap-3 md:gap-0">
                  
                  {/* 1. Fornecedor */}
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

                  {/* 2. Situação */}
                  <td className="md:p-6 block md:table-cell md:text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block whitespace-nowrap ${getStatusClasses(cleanStatus || cleanDesc)}`}>
                          {getDisplayLabel()}
                      </span>
                  </td>

                  {/* 3. Ações / Info Adicional */}
                  <td className="md:p-6 block md:table-cell">
                    {isPending ? (
                      <div className="flex items-center justify-center gap-2 w-full">
                        <ActionButton variant="primary" onClick={() => onMakeOrder(order)}>Fazer Pedido</ActionButton>
                        <ActionButton variant="secondary" onClick={() => onDeclineOrder(order)}>Recusar</ActionButton>
                      </div>
                    ) : isSent ? (
                      <div className="text-center py-2 md:py-0">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-[10px] text-system-text-muted uppercase font-bold tracking-widest opacity-70">
                              Nº Gerado
                            </span>
                            <span className="text-sm text-brand font-mono font-bold">
                              {/* Ajuste aqui para o nome real da propriedade. 
                                Se o TS reclamar, use: (order as any).orderNumber 
                                Apenas para a reunião de hoje!
                              */}
                              #{order.orderNumber || '---'}
                            </span>
                        </div>
                      </div>
                    ) : (
                      /* Se isDeclined for true, cai aqui e fica totalmente vazio */
                      <div className="min-h-10 md:min-h-0" />
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