import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

export interface ReconcileEditParams {
  unique_id: string;
  name: string;
  team_name: string;
  pay_rate: number;
  start_date: string;
  end_date: string;
  record_id: string;
}

export const fetchAr = createAsyncThunk('ar/fetchar', async (data: any) => {
  const response = await postCaller('get_ar', data);

  const list = response.data.ar__list || [];

  return { list, count: response.dbRecCount };
});

export const createAr = createAsyncThunk(
  'create/ar',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_ar', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateAr = createAsyncThunk(
  'update/ar',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_ar', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
