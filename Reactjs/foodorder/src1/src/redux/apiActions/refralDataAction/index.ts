import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
export const getReferralData = createAsyncThunk(
  'get/referalData',
  async (data: any, { rejectWithValue }) => {
    const response = await postCaller('get_referraldata', data);
    if (data.status > 201) {
      return rejectWithValue((data as Error).message);
    }
    return {
      list: response.data,
      count: response.dbRecCount,
    };
  }
);
