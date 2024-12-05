import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface Ipaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}
export const getrefralData = createAsyncThunk(
  'fetch/refralData',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_referraldata', param);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      const list = data?.data?.referral_data_list || [];
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
