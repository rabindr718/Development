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

export const fetchRepIncent = createAsyncThunk(
  'repincent/fetchrepincent',
  async (data: any) => {
    const response = await postCaller('get_rep_incentive', data);
    return {
      list: response.data.rep_incent_list,
      count: response.dbRecCount,
    };
  }
);

export const createRepIncent = createAsyncThunk(
  'create/repincent',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_rep_incentive', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRepIncent = createAsyncThunk(
  'update/repincent',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_rep_incentive', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
