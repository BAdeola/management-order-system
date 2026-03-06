import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import type { SidebarItemProps } from "./interfaces";
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
    <div className="shrink-0  flex items-center justify-center">
      <Icon size={22} strokeWidth={2} />
    </div>

    <AnimatePresence mode="wait">
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.3 }}
          className="font-bold text-sm tracking-tight whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 500);
  };

  return (
    <motion.aside
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        width: isCollapsed ? "80px" : "260px",
        paddingTop: isCollapsed ? "24px" : "32px" // Ajuste sutil no topo ao colapsar
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
      className="h-[calc(100vh-2rem)] m-4 bg-surface-primary border border-system-border-default backdrop-blur-3xl rounded-2xl flex flex-col p-4 shadow-xl relative z-20 overflow-hidden"
    >
      
      {/* SEÇÃO DA LOGO: 
          - Anima a altura (height) para empurrar o menu para baixo.
          - Quando isCollapsed é true, a altura vai para 0 e a logo some.
      */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "80px", opacity: 1, marginBottom: 40 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center justify-center px-3 overflow-hidden"
          >
            <img 
              src={logo} 
              className="h-full w-auto object-contain" 
              alt="Logo Baffs" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navegação: O 'layout' faz os ícones subirem/descerem suavemente */}
      <motion.nav layout className="flex flex-col gap-2 flex-1">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          isCollapsed={isCollapsed} 
          active 
        />
        {/* Adicione mais SidebarItems aqui para ver o efeito de subida em massa */}
      </motion.nav>
    </motion.aside>
  );
};

export default Sidebar;