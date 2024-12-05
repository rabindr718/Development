import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';

export interface ReconcileEditParams {
  pay_scale: string;
  type: string;
  min_rate: string;
  max_rate: string;
  record_id: string;
}

export const fetchAdderCredit = createAsyncThunk(
  'addercredit/fetchaddercredit',
  async (data: any) => {
    const response = await postCaller('get_adder_credit', data);

    return response;
  }
);

export const createAdderCredit = createAsyncThunk(
  'create/addercredit',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_adder_credit', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      toast.success(data.message);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateAdderCredit = createAsyncThunk(
  'update/appsetters',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_adder_credit', params);
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
