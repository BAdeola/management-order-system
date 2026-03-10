import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "../../../../components/ui/Button";
import type { TabelaItensProps, OrderItem } from "./interfaces";

export const TabelaItens = ({ 
    isOpen, onClose, vendorName, items, onSave, onConfirmSend, isLoading, canSend 
}: TabelaItensProps) => {
    
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
                {/* Backdrop Dinâmico */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
                />

                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-surface-modal border border-system-border-default w-full max-w-4xl max-h-[80vh] rounded-4xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header do Modal */}
                    <div className="p-6 md:p-8 border-b border-system-border-default flex justify-between items-center">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-system-text-primary">{vendorName}</h2>
                            <p className="text-system-text-muted text-[10px] uppercase tracking-widest mt-1">Preenchimento de Pedido</p>
                        </div>
                        {isLoading && (
                            <div className="text-brand animate-spin">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Área da Tabela Responsiva */}
                    <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-125">
                            <thead className="sticky top-0 bg-white dark:bg-surface-primary z-10">
                                <tr className="text-system-text-muted text-[10px] font-bold uppercase tracking-widest border-b border-system-border-default">
                                    <th className="pb-4">Produto</th>
                                    <th className="pb-4 text-center">Emb.</th>
                                    <th className="pb-4 w-28 md:w-32 text-center">Qtd</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-system-border-default/30">
                                {items.map((item: OrderItem, index: number) => (
                                    <tr key={item.productCode} className="group hover:bg-brand/5 transition-colors">
                                        <td className="py-4">
                                            <div className="flex flex-col">
                                                <span className="text-system-text-primary font-bold text-sm leading-tight">{item.productName}</span>
                                                <span className="text-[10px] text-system-text-muted">Ref: {item.productCode}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-system-text-secondary text-xs text-center">{item.unitLiteral}</td>
                                        <td className="py-4">
                                            <input 
                                                type="number"
                                                inputMode="numeric"
                                                className="w-full bg-slate-100 dark:bg-white/5 border border-system-border-default rounded-xl p-2 text-system-text-primary text-center focus:border-brand outline-none transition-all font-bold"
                                                value={item.quantity === 0 ? '' : item.quantity}
                                                onFocus={(e) => e.target.select()} 
                                                placeholder="0"
                                                onChange={(e) => onSave(index, e.target.value === "" ? 0 : Number(e.target.value))}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer com Ações */}
                    <div className="p-6 md:p-8bg-surface-modal border border-system-border-default border-t  flex flex-col sm:flex-row justify-end gap-3 transition-colors duration-300">
                        <ActionButton variant="secondary" onClick={onClose} className="w-full sm:w-auto">
                            Cancelar
                        </ActionButton>
                        <ActionButton 
                            variant="primary" 
                            onClick={onConfirmSend}
                            disabled={isLoading || !canSend}
                            className="w-full sm:w-auto"
                        >
                            {isLoading ? 'Enviando...' : 'Enviar Pedido'}
                        </ActionButton>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};