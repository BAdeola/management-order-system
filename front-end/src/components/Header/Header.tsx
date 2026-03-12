import { motion } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useHeader } from "./hooks/useHeader"; // Importando o novo hook

const Header = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const { isDark, toggleTheme } = useTheme();
  const { userName } = useHeader(); // Usando a lógica do nome dinâmico

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-center justify-between py-6 px-4 lg:px-8"
    >
      <div className="flex items-center gap-4">
        {/* Botão Menu Mobile */}
        <button 
          onClick={onOpenMenu}
          className="lg:hidden p-2 rounded-xl bg-surface-primary border border-system-border-default text-brand hover:bg-brand/10 transition-colors"
        >
          <Menu size={24} strokeWidth={2.5} />
        </button>

        <h2 className="text-xl md:text-3xl font-extrabold text-system-text-primary tracking-tighter">
          Olá, <span className="text-brand opacity-90">{userName}</span>
          <span className="inline-block ml-2 animate-bounce-subtle">👋</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* O botão de tema agora usa as cores do sistema para não sumir no branco */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-2xl bg-surface-primary border border-system-border-default backdrop-blur-md text-brand shadow-sm transition-all duration-300 hover:border-brand/40"
        >
          {isDark ? (
            <Sun size={20} strokeWidth={2.5} className="text-yellow-500" />
          ) : (
            <Moon size={20} strokeWidth={2.5} className="text-slate-700" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Header;