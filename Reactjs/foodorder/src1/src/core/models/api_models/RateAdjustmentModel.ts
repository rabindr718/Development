export interface RateAdjustment {
  pay_scale: string;
  unique_id: string;
  position: string;
  adjustment: string;
  min_rate: string;
  max_rate: string;
  is_archived: string;
  start_date: string;
  end_date: string;
  record_id?: number;
}
