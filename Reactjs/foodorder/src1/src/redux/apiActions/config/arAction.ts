// get_dlr_oth_data
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface Ipaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
  report_type: string;
  sale_partner: string;
}

export interface IGetArdata {
  unique_id: string;
  partner: string;
  installer: string;
  type: string;
  home_owner: string;
  street_address: string;
  city: string;
  st: string;
  zip: number;
  sys_size: number;
  wc: string;
  inst_sys: string;
  status: string;
  status_date: string;
  contract_calc: number;
  owe_ar: number;
  total_paid: number;
  current_due: number;
  balance: number;
}

export const getAR = createAsyncThunk(
  'fetch/get-ar',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_ar_data', param);
      const list = (data.data?.ar_data_list || []) as IGetArdata[];
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
