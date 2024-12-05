import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface IPaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

interface ICreateRepCredit {
  unique_id: string;
  Date: string;
  Exact_amt: number;
  Per_kw_amt: number;
  Approved_by: string;
  Notes: string;
}

interface IUpdateRepCredit extends ICreateRepCredit {
  record_id: string;
}

export const fetchRepCreditList = createAsyncThunk(
  '/get_rep_credit',
  async (param: IPaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_rep_credit', param);
      console.log('rep credit action', data);
      const list = data?.data?.rep_credit_list;
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createRepCredit = createAsyncThunk(
  '/create_rep_credit',
  async (param: ICreateRepCredit, { rejectWithValue }) => {
    try {
      const data = await postCaller('create_rep_credit', param);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRepCredit = createAsyncThunk(
  '/update_rep_credit',
  async (param: IUpdateRepCredit, { rejectWithValue }) => {
    try {
      const data = await postCaller('update_rep_credit', param);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const archiveRepCredit = createAsyncThunk(
  '/archive_rep_credit',
  async (recordId: string, { rejectWithValue }) => {
    try {
      const data = await postCaller('archive_rep_credit', {
        record_id: recordId,
      });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
