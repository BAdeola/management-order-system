export interface Order {
  vendorCode: number;
  vendorName: string;        
  dateLabel: string;         
  statusDescription: string; 
  orderStatus: string;      
  createdBy: string;
  vendorType: string;
  orderType: string;
  orderNumber: number | null;
}

export interface TabelaPedidosProps {
  orders: Order[];
  onMakeOrder: (order: Order) => void;
  onDeclineOrder: (order: Order) => void;
}