import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
interface Ipaginate {
  page_number: number;
  page_size: number;
  pay_roll_start_date?: string;
  pay_roll_end_date?: string;
  use_cutoff?: string;
  report_by: string;
  sort_by?: string;
  commission_model: string;
  ap_oth: boolean;
  ap_pda: boolean;
  ap_ded: boolean;
  ap_adv: boolean;
  rep_comm: boolean;
  rep_bonus: boolean;
  leader_ovrd: boolean;
}

export const getRepPay = createAsyncThunk(
  'get/rep-pay',
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await postCaller('get_rep_pay', params);
      const count = resp.record_count || 0;
      const list = resp.data || [];
      return { count, list };
    } catch (error) {
      rejectWithValue((error as Error).message);
    }
  }
);
