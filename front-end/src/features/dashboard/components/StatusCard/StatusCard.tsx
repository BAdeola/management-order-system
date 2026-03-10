import { motion } from "framer-motion";
import type { StatusCardProps } from "./interfaces";

export const StatusCard = ({ label, value }: StatusCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    // Trocamos bg-white/5 e border-white/10 pelas nossas variáveis de sistema
    className="flex-1 bg-surface-primary border border-system-border-default backdrop-blur-md p-6 rounded-3xl shadow-xl flex flex-col gap-1 transition-colors duration-300"
  >
    {/* Label: Agora usa a cor Muted do tema (Cinza no Light / Transparente no Dark) */}
    <span className="text-system-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
      {label}
    </span>
    
    {/* Value: Trocamos text-white por text-system-text-primary ou text-brand */}
    <span className="text-3xl font-black text-system-text-primary">
      {value}
    </span>
  </motion.div>
);