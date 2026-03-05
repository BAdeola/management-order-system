import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import type { MenuLayoutProps } from "./interfaces";

const MenuLayout = ({ children } : MenuLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-(--bg-base) flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        <Header />
        <section className="relative z-10">
            {children}
        </section>
      </main>
    </div>
  );
};

export default MenuLayout