import { motion } from "framer-motion";
import type { StatusCardProps } from "./interfaces";

export const StatusCard = ({ label, value }: StatusCardProps) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl flex flex-col gap-1"
    >
        {/* Label: O título da métrica em letras pequenas e elegantes */}
        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            {label}
        </span>
        
        {/* Value: O número em destaque com a cor da sua marca */}
        <span className="text-3xl font-black text-white">
            {value}
        </span>
    </motion.div>
);