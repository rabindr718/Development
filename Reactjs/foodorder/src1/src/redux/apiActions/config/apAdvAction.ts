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

export const fetchApAdv = createAsyncThunk(
  'apadv/fetchApAdv',
  async (data: any) => {
    const response = await postCaller('get_apadv', data);
    return {
      list: response.data.ap_adv_list,
      count: response.dbRecCount,
    };
  }
);

export const createApAdv = createAsyncThunk(
  'create/createapadv',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_apadv', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateApAdv = createAsyncThunk(
  'update/updateapadv',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_apadv', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
