import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';

interface IPaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

interface ICreateDBA {
  preferred_name: string;
  Dba: string;
}

interface IUpdateDBA extends ICreateDBA {
  record_id: string;
}

export const fetchDBAList = createAsyncThunk(
  '/get_dba',
  async (param: IPaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_dba', param);
      console.log('dba action', data);
      const list = data?.data?.dba_list;
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createDBA = createAsyncThunk(
  '/create_dba',
  async (param: ICreateDBA, { rejectWithValue }) => {
    try {
      const data = await postCaller('create_dba', param);
      toast.success(data?.message);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateDBA = createAsyncThunk(
  '/update_dba',
  async (param: IUpdateDBA, { rejectWithValue }) => {
    try {
      const data = await postCaller('update_dba', param);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const archiveDBA = createAsyncThunk(
  '/archive_dba',
  async (recordId: string, { rejectWithValue }) => {
    try {
      const data = await postCaller('archive_dba', { record_id: recordId });
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
