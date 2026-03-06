export interface SendOrderRequest {
  codfor: number;
  tipped: string;
  items: {
    productCode: number;
    quantity: number;
  }[];
}