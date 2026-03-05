import { motion } from "framer-motion";
import type { StatusCardProps } from "./interfaces";
import type { Order } from "./interfaces";

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

export const TabelaPedidos = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="bg-surface-primary border border-system-border-default backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-system-border-default">
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Fornecedor</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Data</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Situação</th>
            <th className="p-6 text-xs font-bold uppercase tracking-widest text-system-text-muted">Criado Por</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-system-border-default/50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-brand/5 transition-colors group">
              <td className="p-6 text-system-text-primary font-bold">{order.vendorName}</td>
              <td className="p-6 text-system-text-secondary text-sm">{order.date}</td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  order.status === 'FINALIZADO' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-brand'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="p-6 text-system-text-secondary text-sm">{order.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaPedidos;