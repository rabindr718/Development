import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { FilterModel } from '../../../core/models/data_models/FilterSelectModel';
interface Ipaginate {
  page_number: number;
  page_size: number;
  archived: boolean;
  filters: FilterModel[];
}

export interface ICostCreateparam {
  unique_id?: string;
  cost: number;
  start_date: string;
  end_date: string;
  currentPage?: number;
}

export interface ICost extends ICostCreateparam {
  record_id: number;
  currentPage: number;
}

export interface ICostPost extends ICostCreateparam {
  currentPage: number;
}

export const getInstallCost = createAsyncThunk(
  'fetch/installCost',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_installcost', param);
      const count = data.dbRecCount;
      const list = data.data.install_cost_list || ([] as ICost[]);
      return { count, list };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createInstallCost = createAsyncThunk(
  'create/installCost',
  async (params: ICostPost, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_installcost', params);
      if (data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// update_installcost

export const updateInstallCost = createAsyncThunk(
  'update/installCost',
  async (params: ICost, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_installcost', params);
      if (data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
