import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "../../../../components/ui/Button";

export const TabelaItens = ({ isOpen, onClose, vendorName, items, onSave }: any) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop: O fundo que escurece */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content: Estilo Liquid Glass */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative bg-surface-primary border border-white/10 w-full max-w-4xl max-h-[80vh] rounded-4xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="p-8 border-b border-white/5">
            <h2 className="text-2xl font-black text-white">{vendorName}</h2>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Preenchimento de Pedido</p>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4">Produto</th>
                  <th className="pb-4">Embalagem</th>
                  <th className="pb-4 w-32">Quantidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item: any, index: number) => (
                  <tr key={item.productCode} className="group">
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">{item.productName}</span>
                        <span className="text-[10px] text-slate-500">Ref: {item.productCode}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-400 text-sm">{item.unitLiteral}</td>
                    <td className="py-4">
                      <input 
                        type="number"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white text-center focus:border-brand outline-none transition-colors"
                        defaultValue={item.quantity}
                        onChange={(e) => onSave(index, Number(e.target.value))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-black/20 backdrop-blur-xl border-t border-white/5 flex justify-end gap-4">
            <ActionButton variant="secondary" onClick={onClose}>Cancelar</ActionButton>
            <ActionButton variant="primary" onClick={() => console.log('Enviar')}>Enviar Pedido</ActionButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};