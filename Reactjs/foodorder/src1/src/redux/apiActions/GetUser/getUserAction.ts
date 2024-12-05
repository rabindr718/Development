// get_dlr_oth_data
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface Ipaginate {
  page_number: number;
  page_size: number;
}

export const getUser = createAsyncThunk(
  'fetch/getUser',
  async (params: Ipaginate, { rejectWithValue }) => {
    try {
      const response = await postCaller('get_profile', params); // Assuming this is a GET request
      const tableName = response.data; // Extract the data from the response
      return tableName;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'fetch/updateUser',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await postCaller('update_profile', params); // Assuming this is a GET request
      const tableName = response.data; // Extract the data from the response
      await dispatch(getUser({ page_number: 1, page_size: 10 }));
      return tableName;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
