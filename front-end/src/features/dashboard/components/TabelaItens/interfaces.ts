// Representa um produto dentro do modal de pedido
export interface OrderItem {
  productCode: number;
  productName: string;
  unitLiteral: string;
  quantity: number;
}

// Props para o componente TabelaItens
export interface TabelaItensProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string | undefined;
  items: OrderItem[];
  onSave: (index: number, qty: number) => void;
  onConfirmSend: () => void; // Gatilho para o envio final
  isLoading?: boolean;       // Para mostrar um feedback de carregamento
  canSend?: boolean;
}