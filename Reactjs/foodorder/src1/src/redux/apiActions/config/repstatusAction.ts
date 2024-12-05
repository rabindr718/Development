import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface IPaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

interface ICreateRepStatus {
  name: string;
  status: string;
}

interface IUpdateRepStatus extends ICreateRepStatus {
  record_id: string;
}

export const fetchRepStatusList = createAsyncThunk(
  '/get_rep_status',
  async (param: IPaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_rep_status', param);
      console.log('rep status action', data);
      const list = data?.data?.rep_incent_list;
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createRepStatus = createAsyncThunk(
  '/create_rep_status',
  async (param: ICreateRepStatus, { rejectWithValue }) => {
    try {
      const data = await postCaller('create_rep_status', param);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRepStatus = createAsyncThunk(
  '/update_rep_status',
  async (param: IUpdateRepStatus, { rejectWithValue }) => {
    try {
      const data = await postCaller('update_rep_status', param);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const archiveRepStatus = createAsyncThunk(
  '/archive_rep_status',
  async (param: number[], { rejectWithValue }) => {
    try {
      const data = await postCaller('update_rep_status_archive', {
        record_id: param,
        is_archived: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
