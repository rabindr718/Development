import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

export interface ReconcileEditParams {
  unique_id: string;
  pay_scale: number;
  percentage: number;
  record_id: number;
}

export const fetchAdderResponsibility = createAsyncThunk(
  'adderResponsibility/fetchAdderResponsibility',
  async (data: any) => {
    const response = await postCaller('get_adder_responsibility', data);

    return {
      list: response.data.adder_responsibility_list,
      count: response.dbRecCount,
    };
  }
);

export const createAdderResponsibility = createAsyncThunk(
  'create/adder-responsibility',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await postCaller('create_adder_responsibility', params);
      if (response.status > 201) {
        return rejectWithValue((response as Error).message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateAdderResponsibility = createAsyncThunk(
  'update/adder-responsibility',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_adder_responsibility', params);

      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
