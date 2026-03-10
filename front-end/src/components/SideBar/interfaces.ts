import type { LucideIcon } from "lucide-react";

// Para os itens individuais do menu
export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  active?: boolean;
}

// Para a Sidebar principal
export interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}