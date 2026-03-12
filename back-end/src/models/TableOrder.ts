export interface TableOrderRow {
  vendorName: string;        // NOMFOR-WS
  statusDescription: string; // STATUS-PEDIDO (A lógica do COBOL)
  vendorCode: number;        // CODFOR-WS
  orderType: string;         // TIPPED-WS
  rawDate: Date | null;      // DATPED-WS
  orderNumber: number | null;// NUMPED-WS
  vendorType: string;        // TIPFOR-WS
  orderStatus: string;       // SITPED-WS
}