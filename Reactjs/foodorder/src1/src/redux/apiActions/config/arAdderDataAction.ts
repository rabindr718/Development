import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface IFilter {
  Column?: string;
  Operation?: string;
  Data?: string;
}

interface IAdderParams {
  page_number: number;
  page_size: number;
  filters?: IFilter[];
  archived: boolean;
}

interface IAdderCreateParams {
  unique_id: string;
  date: string;
  type_ad_mktg?: string;
  type?: string;
  gc: string;
  exact_amount: any;
  per_kw_amt: number;
  rep_percent: number;
  description: string;
  notes: string;
  sys_size?: number;
  adder_cal?: number;
}

export interface IAdderRowData extends IAdderCreateParams {
  record_id: number;
}

export const getarAdderData = createAsyncThunk(
  'fetch/arAdderData',
  async (param: IAdderParams, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_adderdata', param);
      const list = (data.data.adder_data_list || []) as IAdderRowData[];
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createarAdderData = createAsyncThunk(
  'create/arAdderData',
  async (param: IAdderCreateParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_adderdata', param);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updatearAdderData = createAsyncThunk(
  'update/arAdderData',
  async (param: IAdderRowData, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_adderdata', param);
      if (data.status === 500 || data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
