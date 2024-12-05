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

export const fetchApPda = createAsyncThunk(
  'appda/fetchApPda',
  async (data: any) => {
    const response = await postCaller('get_appda', data);
    return {
      list: response.data.ap_pda_list,
      count: response.dbRecCount,
    };
  }
);

export const createApPda = createAsyncThunk(
  'create/appda',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_appda', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateApPda = createAsyncThunk(
  'update/appda',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_appda', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
