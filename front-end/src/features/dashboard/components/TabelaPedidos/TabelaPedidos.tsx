import { motion } from "framer-motion";
import type { StatusCardProps, TabelaPedidosProps } from "./interfaces";
import { ActionButton } from "../../../../components/ui/Button";

export const StatusCard = ({ label, value  }: StatusCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface-primary border border-system-border-default backdrop-blur-xl p-6 rounded-4xl shadow-sm flex flex-col gap-1 min-w-50"
  >
    <span className="text-system-text-muted text-xs font-bold uppercase tracking-widest">{label}</span>
    <span className="text-3xl font-black text-brand">{value}</span>
  </motion.div>
);

const getStatusClasses = (orderStatus: string) => {
  // Padronizamos para evitar erros de case-sensitive
  const status = orderStatus?.toUpperCase();

  // "ABERTO", "AGUARANDO ENVIO", "AGUARDANDO LIBERAÇÃO" -> AMARELO
  // Note: incluí o erro de digitação "AGUARANDO" caso o banco legado o utilize
  if (['ABERTO', 'AGUARANDO ENVIO', 'AGUARDANDO ENVIO', 'AGUARDANDO LIBERAÇÃO', 'AGUARDANDO LIBERACAO'].includes(status)) {
    return 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20';
  }

  // "FINALIZADO" -> VERDE
  if (status === 'FINALIZADO') {
    return 'bg-green-500/10 text-green-600 border border-green-500/20';
  }

  // "CANCELADO" ou "NÃO TEM PEDIDO" -> CINZA
  if (['CANCELADO', 'NÃO TEM PEDIDO'].includes(status)) {
    return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
  }

  // Fallback (ex: "PEDIDO NÃO EFETUADO") -> Cor da sua Marca (Brand)
  return 'bg-brand/10 text-brand border border-brand/20';
};

export const TabelaPedidos = ({ orders, onMakeOrder, onDeclineOrder }: TabelaPedidosProps ) => {
  return (
    <div className="bg-surface-primary border border-system-border-default backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-system-border-default">
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Fornecedor</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Data</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Situação</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center">Criado Por</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-system-border-default/50">
          {orders.map((order) => (
            <tr key={order.vendorCode} className="hover:bg-brand/5 transition-colors group">
              <td className="p-6 text-system-text-primary font-bold">{order.vendorName}</td>
              <td className="p-6 text-system-text-secondary text-sm text-center">{order.dateLabel}</td>
              <td className="p-6 text-center">
                 {/* Badge de status que já configuramos */}
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusClasses(order.orderStatus)}`}>
                  {order.statusDescription}
                </span>
              </td>
              <td className="p-6 text-system-text-secondary text-sm text-center">{order.createdBy}</td>
              
              {/* COLUNA DE AÇÕES */}
              <td className="p-6">
                <div className="flex items-center justify-center gap-2">
                  <ActionButton 
                    variant="primary" 
                    onClick={() => onMakeOrder(order)}
                  >
                    Fazer Pedido
                  </ActionButton>
                  
                  <ActionButton 
                    variant="secondary" 
                    onClick={() => onDeclineOrder(order.vendorCode)}
                  >
                    Recusar
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaPedidos;