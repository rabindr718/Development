// get_dlr_oth_data
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface Ipaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

interface IDLRCreateParams {
  unique_id: string;
  payee: string;
  amount: number | string;
  description: string;
  balance?: number;
  paid_amount?: number;
  date: string;
}

export interface IRowDLR extends IDLRCreateParams {
  record_id: number;
}

export const getDlrOth = createAsyncThunk(
  'fetch/get_dlr_oth_data',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_dlr_oth_data', param);
      const list = data.data.dlr_othlist || ([] as IRowDLR[]);
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createDlrOth = createAsyncThunk(
  'create/dlrOth',
  async (params: IDLRCreateParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_dlr_oth', params);
      if (data instanceof Error || data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateDlrOth = createAsyncThunk(
  'update/dlrOth',
  async (params: IRowDLR, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_dlr_oth', params);
      if (data instanceof Error || data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      await dispatch(
        getDlrOth({ page_number: 1, page_size: 10, archived: false })
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
