import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "../../components/ui/Button";
import type { ConfirmationModalProps } from "./interfaces";

export const ConfirmationModal = ({
    isOpen, onClose, onConfirm, title, message, confirmText, cancelText
}: ConfirmationModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                {/* Backdrop: Menos opaco no Light para não "sujar" o visual */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm"
                />

                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-surface-modal border border-system-border-default p-8 rounded-4xl shadow-2xl max-w-md w-full text-center"
                >
                    <h3 className="text-xl font-black text-system-text-primary mb-2">
                        {title}
                    </h3>
                    <p className="text-system-text-muted text-sm mb-8 leading-relaxed">
                        {message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <ActionButton variant="secondary" onClick={onClose} className="flex-1 order-2 sm:order-1">
                            {cancelText}
                        </ActionButton>
                        <ActionButton variant="primary" onClick={onConfirm} className="flex-1 order-1 sm:order-2">
                            {confirmText}
                        </ActionButton>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};