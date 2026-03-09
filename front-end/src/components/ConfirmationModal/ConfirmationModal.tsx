import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "../../components/ui/Button";
import type { ConfirmationModalProps } from "./interfaces";

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop escurecido com desfoque */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Card de Alerta */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-surface-primary border border-white/10 p-8 rounded-4xl shadow-2xl max-w-md w-full text-center"
            >
            <h3 className="text-xl font-black text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                {message}
            </p>

            <div className="flex gap-3 justify-center">
                {/* Botão Secundário (Geralmente o Cancelar) */}
                <ActionButton variant="secondary" onClick={onClose} className="flex-1">
                {cancelText}
                </ActionButton>
                
                {/* Botão Primário (A ação de confirmar) */}
                <ActionButton variant="primary" onClick={onConfirm} className="flex-1">
                {confirmText}
                </ActionButton>
            </div>
            </motion.div>
        </div>
        </AnimatePresence>
    );
};