import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

const Header = () => {
    const [isDark, setIsDark] = useState(false);
    
    return (
        <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex items-center justify-between py-6 px-4 md:px-0"
        >
            {/* Lado Esquerdo: Saudação */}
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-system-text-primary tracking-tighter">
                <span>
                Olá, <span className="text-brand opacity-90">Brayan</span>
                </span>
                
                {/* Correção do erro de display */}
                <motion.span
                className="inline-block cursor-default select-none"
                animate={{ rotate: [0, 20, 0, 20, 0] }}
                transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 2.5, 
                    ease: "easeInOut" 
                }}
                style={{ originX: 0.7, originY: 0.7 }}
                >
                👋
                </motion.span>
            </h2>

            {/* Lado Direito: Toggle de Tema (Liquid Style) */}
            <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.1, backgroundColor: "var(--surface-hover)" }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-surface-primary border border-system-border-default backdrop-blur-md text-brand shadow-sm cursor-pointer transition-colors"
            >
                {isDark ? (
                <Sun size={20} strokeWidth={2.5} />
                ) : (
                <Moon size={20} strokeWidth={2.5} />
                )}
            </motion.button>
        </motion.header>
    )
}

export default Header
