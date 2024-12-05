import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

export const fetchApRep = createAsyncThunk(
  'aprep/fetchApRep',
  async (data: any) => {
    const response = await postCaller('get_aprep', data);
    return {
      list: response.data.ap_rep_list,
      count: response.dbRecCount,
    };
  }
);

export const createApRep = createAsyncThunk(
  'create/aprep',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_aprep', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateApRep = createAsyncThunk(
  'update/aprep',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_aprep', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
