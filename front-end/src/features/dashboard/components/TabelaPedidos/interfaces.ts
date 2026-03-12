export interface Order {
  vendorCode: number;
  vendorName: string;         
  statusDescription: string; 
  orderStatus: string;
  vendorType: string;
  orderType: string;
  orderNumber: number | null;
}

export interface TabelaPedidosProps {
  orders: Order[];
  onMakeOrder: (order: Order) => void;
  onDeclineOrder: (order: Order) => void;
}