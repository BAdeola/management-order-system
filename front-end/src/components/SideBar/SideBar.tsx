import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard,
  ChevronLeft, 
  ChevronRight, 
} from "lucide-react";
import type { SidebarItemProps } from "./interfaces";

const SidebarItem = ({ icon: Icon, label, isCollapsed, active = false } : SidebarItemProps) => (
  <motion.div
    whileHover={{ backgroundColor: "var(--surface-hover)" }}
    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors ${
      active ? "bg-brand text-white" : "text-system-text-secondary"
    }`}
  >
    <Icon size={22} strokeWidth={2.5} />
    <AnimatePresence>
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

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? "80px" : "260px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Bezier da Apple
      className="h-[calc(100vh-2rem)] m-4 bg-surface-primary border border-system-border-default backdrop-blur-3xl rounded-[2.5rem] flex flex-col p-4 shadow-xl relative z-20"
    >
      {/* Botão para recolher o menu */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-white border border-orange-100 p-1.5 rounded-full text-brand shadow-md hover:scale-110 transition-transform cursor-pointer"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo / Nome do App */}
      <div className="flex items-center gap-3 px-3 mb-10 h-10 overflow-hidden">
        <div className="w-8 h-8 bg-brand rounded-xl shrink-0 shadow-lg shadow-brand/20" />
        {!isCollapsed && (
          <motion.span className="font-black text-xl text-system-text-primary tracking-tighter">
            CoachPro
          </motion.span>
        )}
      </div>

      {/* Itens do Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} active />
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
