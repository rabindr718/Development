export interface TierLoanFeeModel {
  record_id: number;
  dealer_tier: string;
  installer: string;
  state: string;
  loan_type: string;
  owe_cost: string | number;
  dlr_mu: string | number;
  dlr_cost: string | number;
  start_date: string | number;
  end_date: string;
}
