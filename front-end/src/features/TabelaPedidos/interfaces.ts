export interface Order {
  id: number;
  vendorName: string;
  date: string;
  status: string;
  createdBy: string;
}

export interface StatusCardProps {
  label: string;
  value: number | string;
}