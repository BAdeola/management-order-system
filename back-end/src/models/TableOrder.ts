export interface TableOrderRow {
  vendorName: string;        // NOMFOR-WS
  dateLabel: string;         // DATA-TABELA
  statusDescription: string; // STATUS-PEDIDO (A lógica do COBOL)
  createdBy: string;         // "LOJA"
  vendorCode: number;        // CODFOR-WS
  orderType: string;         // TIPPED-WS
  rawDate: Date | null;      // DATPED-WS
  orderNumber: number | null;// NUMPED-WS
  vendorType: string;        // TIPFOR-WS
  orderStatus: string;       // SITPED-WS
}