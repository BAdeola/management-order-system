import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import type { MenuLayoutProps } from "./interfaces";

const MenuLayout = ({ children }: MenuLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-base transition-colors duration-500">
      {/* Sidebar: Agora recebe as props de controle mobile */}
      <Sidebar 
        isMobileOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Header: Passamos a função para abrir o menu */}
        <Header onOpenMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Backdrop para fechar o menu ao clicar fora no mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
export default MenuLayout