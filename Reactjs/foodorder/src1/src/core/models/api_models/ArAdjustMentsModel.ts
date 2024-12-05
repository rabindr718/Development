export interface Adjustment {
  record_id: number;
  unique_id: string;
  customer: string;
  partner_name: string;
  installer_name: string;
  state_name: string;
  sys_size: number;
  is_archived: boolean;
  bl: string;
  epc: number;
  date: string;
  notes: string;
  amount: number;
  start_date: string;
  end_date: string;
}
