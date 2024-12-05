export interface CommissionModel {
  // [key: string]: string | number | Date
  record_id: number;
  partner: string;
  installer: string;
  state: string;
  sale_type: string;
  sale_price: number | string;
  rep_type: string;
  rl: number | string;
  rate: number | string;
  start_date: string;
  end_date: string;
}
