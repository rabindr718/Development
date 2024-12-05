export interface LoanFeeAdderModel {
  record_id: number;
  type: string;
  dealer: string;
  installer: string;
  state: string;
  contract: string;
  dlr_tier: string;
  owe_cost: number;
  addr_amt: number;
  per_kw_amt: string;
  rep: string;
  description: string;
  rep_1: string;
  rep_2: string;
  sys_size: string;
  rep_count: string;
  per_rep_addr: string;
  per_rep_ovrd: string;
  share: string;
  r1_pay_scale: string;
  rep1_def_resp: string;
  r1_addr_resp: string;
  r2_pay_scale: string;
  rep2_def_resp: string;
}
