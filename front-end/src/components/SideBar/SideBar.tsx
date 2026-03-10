import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, X } from "lucide-react"; // Importe o X
import type { SidebarItemProps, SidebarProps } from "./interfaces";
import logo from "../../assets/logobaffs.png";

const SidebarItem = ({ icon: Icon, label, isCollapsed, active = false }: SidebarItemProps) => (
  <motion.div
    layout
    whileHover={{ backgroundColor: "var(--surface-primary)" }}
    className={`
      relative flex items-center rounded-xl cursor-pointer transition-colors overflow-hidden
      ${isCollapsed ? "justify-center h-12 w-12 mx-auto" : "gap-4 p-4 w-full"}
      ${active ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-system-text-secondary"}
    `}
  >
    <div className="shrink-0 flex items-center justify-center">
      <Icon size={22} strokeWidth={2} />
    </div>

    <AnimatePresence mode="wait">
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="font-bold text-sm tracking-tight whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.div>
);

const Sidebar = ({ isMobileOpen, onClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsCollapsed(true), 500);
  };

  return (
    <>
      <motion.aside
        layout
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // LÓGICA DE ANIMAÇÃO:
        // No Mobile: desliza de -100% para 0.
        // No Desktop: expande a largura de 80px para 260px.
        initial={false}
        animate={{ 
          width: isMobileOpen ? "280px" : (isCollapsed ? "80px" : "260px"),
          x: typeof window !== 'undefined' && window.innerWidth < 1024 && !isMobileOpen ? "-100%" : 0
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
        className={`
          h-[calc(100vh-2rem)] m-4 border border-system-border-default 
          bg-surface-modal rounded-2xl flex flex-col p-4 shadow-xl overflow-hidden
          fixed inset-y-0 left-0 z-50 lg:relative lg:flex
          ${isMobileOpen ? "flex" : "hidden lg:flex"}
        `}
      >
        {/* Botão de Fechar (Apenas Mobile) */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-system-text-muted hover:text-brand"
        >
          <X size={20} />
        </button>
        
        {/* SEÇÃO DA LOGO */}
        <AnimatePresence>
          {(!isCollapsed || isMobileOpen) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "80px", opacity: 1, marginBottom: 40 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center justify-center px-3 overflow-hidden"
            >
              <img src={logo} className="h-full w-auto object-contain" alt="Logo Baffs" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navegação */}
        <motion.nav layout className="flex flex-col gap-2 flex-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            // No mobile, nunca colapsa o item para facilitar o clique
            isCollapsed={isMobileOpen ? false : isCollapsed} 
            active 
          />
        </motion.nav>
      </motion.aside>

      {/* Overlay: Escurece o fundo quando o menu abre no celular */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;