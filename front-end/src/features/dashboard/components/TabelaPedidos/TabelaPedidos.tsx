import { motion } from "framer-motion";
import type { StatusCardProps, TabelaPedidosProps } from "./interfaces";
import { ActionButton } from "../../../../components/ui/Button";

// Componente para os cards de métricas no topo do dashboard
export const StatusCard = ({ label, value }: StatusCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface-primary border border-system-border-default backdrop-blur-xl p-6 rounded-4xl shadow-sm flex flex-col gap-1 min-w-50"
  >
    <span className="text-system-text-muted text-xs font-bold uppercase tracking-widest">{label}</span>
    <span className="text-3xl font-black text-brand">{value}</span>
  </motion.div>
);

// Função auxiliar para mapear o status do SQL Server 2005 para o visual do Front-end
const getStatusClasses = (orderStatus: string | null) => {
  const status = orderStatus?.trim().toUpperCase();

  // Se for nulo, ou não tiver status, é porque ainda não foi feito pedido
  if (!status || status === 'ABERTO') {
    // Note que separei a cor aqui: Laranja para "Novo"
    return 'bg-orange-500/10 text-orange-500 border border-orange-500/20';
  }

  // Amarelo: Processando
  if (['AGUARANDO ENVIO', 'AGUARDANDO ENVIO', 'AGUARDANDO LIBERACAO', 'AGUARDANDO LIBERAÇÃO'].includes(status)) {
    return 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20';
  }

  // Verde: Concluído
  if (status === 'FINALIZADO') {
    return 'bg-green-500/10 text-green-600 border border-green-500/20';
  }

  // Cinza: Cancelado ou Recusado
  // Adicionei 'CANCELADA' porque vi na sua imagem do banco
  if (['CANCELADO', 'CANCELADA', 'NÃO TEM PEDIDO'].includes(status)) {
    return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
  }

  return 'bg-brand/10 text-brand border border-brand/20';
};

export const TabelaPedidos = ({ orders, onMakeOrder, onDeclineOrder }: TabelaPedidosProps) => {
  return (
    <div className="bg-surface-primary border border-system-border-default backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-system-border-default">
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Fornecedor</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Data</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Situação</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Criado Por</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-system-border-default/50">
          {orders.map((order) => {
            
            // 2. A Lógica de Desativação
            const rawStatus = order.orderStatus?.trim().toUpperCase();
            const canInteract = !rawStatus || rawStatus === 'ABERTO';
            const isActionDisabled = !canInteract;

            return (
              <tr key={order.vendorCode} className="hover:bg-brand/5 transition-colors group">
                {/* Fornecedor e Código */}
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="text-system-text-primary font-bold">{order.vendorName}</span>
                    <span className="text-[10px] text-system-text-muted uppercase tracking-tighter">Cod: {order.vendorCode}</span>
                  </div>
                </td>

                {/* Data Formatada (Vem do SQL como String 103) */}
                <td className="p-6 text-system-text-secondary text-sm text-center">
                  {order.dateLabel}
                </td>

                {/* Status Badge (Tradução da lógica do COBOL) */}
                <td className="p-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block ${getStatusClasses(order.orderStatus)}`}>
                    {order.statusDescription}
                  </span>
                </td>

                {/* Criado Por */}
                <td className="p-6 text-system-text-secondary text-sm text-center">
                  {order.createdBy}
                </td>

                {/* Coluna de Ações: Fazer Pedido ou Recusar */}
                <td className="p-6">
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton 
                      variant="primary" 
                      disabled={isActionDisabled} // Agora vai considerar o trim()
                      onClick={() => onMakeOrder(order)}
                      className="cursor-pointer"
                    >
                      Fazer Pedido
                    </ActionButton>
                    
                    <ActionButton 
                      variant="secondary" 
                      disabled={isActionDisabled}
                      onClick={() => onDeclineOrder(order)}
                      className="cursor-pointer"
                    >
                      Recusar
                    </ActionButton>
                  </div>
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