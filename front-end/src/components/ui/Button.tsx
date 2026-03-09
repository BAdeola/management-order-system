import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const ActionButton = ({ children, variant, onClick, disabled, className }: ButtonProps) => {
  // Configuração de estilos baseada na sua solicitação
  const variants = {
    primary: "bg-brand text-white border border-brand hover:bg-brand/90 shadow-lg shadow-brand/20",
    secondary: "bg-brand/5 text-brand border border-brand/50 hover:bg-brand/10 backdrop-blur-sm"
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest 
        transition-all duration-200 flex items-center justify-center gap-2
        ${variants[variant]} 
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : ''} // Estilo desativado
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};