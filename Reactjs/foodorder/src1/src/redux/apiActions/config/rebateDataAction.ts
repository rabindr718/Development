import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';

interface ReconcileEditParams {
  unique_id: string;
  customer_verf: string;
  type: string;
  item: string;
  amount: number;
  rep_doll_divby_per: number;
  notes: string;
  date: string;
}
interface IUpdateREBATE extends ReconcileEditParams {
  record_id: string;
}

export const fetchRebateData = createAsyncThunk(
  'RebateData/fetchRebateData',
  async (data: any) => {
    const response = await postCaller('get_rebate_data', data);
    console.log('rebate data action', response);
    const list = response?.data?.rebate_data_list;
    return { list, count: response.dbRecCount };
  }
);

export const createRebateData = createAsyncThunk(
  'create/rebatedata',
  async (params: ReconcileEditParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_rebate_data', params);
      toast.success(data?.message);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRebateData = createAsyncThunk(
  'update/rebatedata',
  async (params: IUpdateREBATE, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_rebate_data', params);
      await dispatch(fetchRebateData({ page_number: 1, page_size: 10 }));
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
