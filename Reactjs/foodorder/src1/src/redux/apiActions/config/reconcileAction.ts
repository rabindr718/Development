import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

export interface ReconcileEditParams {
  unique_id: string;
  customer: string;
  partner_name: string;
  state_name: string;
  sys_size: number;
  status: string;
  start_date: string;
  end_date: string;
  amount: number;
  notes: string;
  record_id: string;
}

export const fetchReconcile = createAsyncThunk(
  'reconcile/fetchreconcile',
  async (data: any) => {
    const response = await postCaller('get_reconcile', data);

    return { list: response.data.reconcile_list, count: response.dbRecCount };
  }
);

export const createReconcile = createAsyncThunk(
  'create/reconcile',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_reconcile', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateReconcile = createAsyncThunk(
  'update/reconcile',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_reconcile', params);

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
