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

export const fetchApOth = createAsyncThunk(
  'apoth/fetchapoth',
  async (data: any) => {
    const response = await postCaller('get_apoth', data);
    return {
      list: response.data.ap_oth_list,
      count: response.dbRecCount,
    };
  }
);

export const createApOth = createAsyncThunk(
  'create/apoth',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_apoth', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateApOth = createAsyncThunk(
  'updateapoth/updateapoth',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_apoth', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
