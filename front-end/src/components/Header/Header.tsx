import { motion } from "framer-motion";
// No topo do Header.tsx ou Sidebar.tsx
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme"; // Importe o hook

const Header = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header className="w-full flex items-center justify-between py-6 px-4 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Botão Menu Mobile: Oculto em lg (desktop) */}
        <button 
          onClick={onOpenMenu}
          className="lg:hidden p-2 rounded-xl bg-surface-primary border border-system-border-default text-brand"
        >
          {/* Esse é o ícone que vem da biblioteca Lucide */}
          <Menu size={24} strokeWidth={2.5} />
        </button>

        <h2 className="text-xl md:text-3xl font-extrabold text-system-text-primary tracking-tighter">
          Olá, <span className="text-brand opacity-90">Brayan</span>
          <span className="inline-block ml-2">👋</span>
        </h2>
      </div>

      <motion.button
        onClick={toggleTheme} // Usa a função do hook
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-2xl bg-surface-primary border border-system-border-default backdrop-blur-md text-brand shadow-sm transition-all duration-300"
      >
        {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
      </motion.button>
    </motion.header>
  );
}

export default Header;