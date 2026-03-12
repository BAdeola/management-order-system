import { motion } from "framer-motion";
import type { StatusCardProps } from "./interfaces";

export const StatusCard = ({ label, value }: StatusCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="
      /* Layout Base e Quadrado no Mobile */
      flex-1 aspect-square md:aspect-auto 
      flex flex-col items-center justify-center md:items-start md:justify-start
      
      /* Estilo */
      bg-surface-primary border border-system-border-default backdrop-blur-md 
      p-2 md:p-6 rounded-2xl md:rounded-3xl shadow-xl 
      transition-colors duration-300 gap-1
    "
  >
    <span className="
      text-system-text-muted text-[12px] md:text-sm
      font-bold uppercase tracking-tighter md:tracking-[0.2em]
      text-center md:text-left leading-tight max-w-full wrap-break-word
    ">
      {label}
    </span>

    <span className="text-3xl md:text-4xl font-black text-system-text-primary leading-none">
      {value}
    </span>
  </motion.div>
);