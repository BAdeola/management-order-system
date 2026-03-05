import type { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  active?: boolean; // O '?' torna a propriedade opcional, resolvendo o erro ts(2741)
}