// get_dlr_oth_data
import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface Ipaginate {
  page_number: number;
  page_size: number;
  archived?: boolean;
}

interface INonCommCreateParams {
  unique_id: string;
  customer?: string;
  dealer_name?: string;
  dealer_dba?: string;
  exact_amount: string | number;
  approved_by: string;
  notes: string;
  balance?: number;
  paid_amount?: number;
  dba?: string;
  date: string;
}

export interface INonCommRowDLR extends INonCommCreateParams {
  record_id: number;
}

export const getNonComm = createAsyncThunk(
  'fetch/ge_non_comm',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_noncommdlrpay', param);
      const list =
        data.data.noncomm_dlr_pay_data_list || ([] as INonCommRowDLR[]);
      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createNonComm = createAsyncThunk(
  'create/create_non_comm',
  async (params: INonCommCreateParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_noncommdlrpay', params);
      if (data instanceof Error || data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateNoncom = createAsyncThunk(
  'update/updateNoncom',
  async (params: INonCommRowDLR, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_noncommdlrpay', params);
      if (data instanceof Error || data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
