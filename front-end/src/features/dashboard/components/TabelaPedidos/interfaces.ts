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

export interface StatusCardProps {
  label: string;
  value: number | string;
}

export interface TabelaPedidosProps {
  orders: Order[];
  onMakeOrder: (order: Order) => void;
  onDeclineOrder: (vendorCode: number) => void;
}