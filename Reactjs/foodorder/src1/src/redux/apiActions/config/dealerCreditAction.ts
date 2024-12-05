import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { configPostCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { FilterModel } from '../../../core/models/data_models/FilterSelectModel';
interface Ipaginate {
  page_number: number;
  page_size: number;
  archived: boolean;
  filters: FilterModel[];
}

export interface DCreditCreateparam {
  unique_id: string;
  date: string;
  exact_amt: number;
  per_kw_amt: number;
  approved_by: string;
  notes: string;
  currentPage?: number;
}

export interface DCredit extends DCreditCreateparam {
  record_id: number;
  currentPage: number;
}

export interface DCredit extends DCreditCreateparam {
  currentPage: number;
}

export const getDealerCredit = createAsyncThunk(
  'fetch/dealercredit',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await configPostCaller('get_dealercredit', param);
      const count = data.dbRecCount;
      const list = data.data.DealerCreditsData;
      return { count, list };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createDealerCredit = createAsyncThunk(
  'create/dealercredit',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_dealercredit', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// update_installcost

export const updateDealerCredit = createAsyncThunk(
  'update/dealercredit',
  async (params: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_dealercredit', params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
