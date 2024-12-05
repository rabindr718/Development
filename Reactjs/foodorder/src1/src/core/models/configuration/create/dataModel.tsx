export interface dataModel {
  // [key: string]: string | number | Date
  record_id: number;
  partner: string;
  installer: string;
  state: string;
  sale_type: string;
  sale_price: number;
  rep_type: string;
  rl: number;
  rate: number;
  start_date: string;
  end_date: string;
}
