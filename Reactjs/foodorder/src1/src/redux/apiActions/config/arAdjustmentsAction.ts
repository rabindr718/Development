import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { FilterModel } from '../../../core/models/data_models/FilterSelectModel';

interface Ipaginate {
  page_number: number;
  page_size: number;
  archived: boolean;
  filters: FilterModel[];
}

interface IRateCreateParams {
  unique_id?: string;
  customer?: string;
  partner_name?: string;
  state_name?: string;
  installer_name?: string;
  sys_size?: number;
  bl?: string;
  epc?: number;
  date?: string;
  notes?: string;
  amount?: number;
  start_date?: string;
  end_date?: string;
}

export interface IRateRow extends IRateCreateParams {
  record_id: number;
}

export const getAdjustments = createAsyncThunk(
  'fetch/ar-adjustments',
  async (params: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_adjustments', params);
      const list = data?.data?.adjustments_list || ([] as IRateRow[]);
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createAdjustments = createAsyncThunk(
  'create/ar-adjustments',
  async (params: IRateCreateParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_adjustments', params);
      if (data.status > 201 || data instanceof Error) {
        console.log('workinggg', data.status);
        return rejectWithValue((data as Error).message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateAdjustments = createAsyncThunk(
  'update/ar-adjustments',
  async (params: IRateRow, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_adjustments', params);
      if (data.status > 201 || data instanceof Error) {
        console.log('workinggg', data.status);
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
