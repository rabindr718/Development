import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
interface Ipaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

export const fetchAutoAdder = createAsyncThunk(
  'fetch/auto-adder',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_autoadder', param);
      const list = data.data.noncomm_dlr_pay_data_list;
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
