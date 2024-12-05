import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';

interface IFilter {
  Column?: string;
  Operation?: string;
  Data?: string;
}

interface ILoadFeeParams {
  page_number: number;
  page_size: number;
  filters?: IFilter[];
  archived: boolean;
}

export interface ILoan {
  unique_id?: string;
  dealer: string;
  installer: string;
  state: string;
  loan_type: string;
  owe_cost: number;
  dlr_mu: number;
  dlr_cost: number;
  start_date: string;
  end_date: string;
}

export interface ILoanRow extends ILoan {
  record_id: number;
}

export const getLoanFee = createAsyncThunk(
  'fetch/arAdderData',
  async (param: ILoadFeeParams, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_loan_fee', param);
      const list = data.data.loan_fee_list || ([] as ILoanRow[]);

      return { list, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createLoanFee = createAsyncThunk(
  'create/loanFee',
  async (param: ILoan, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_loan_fee', param);
      if (data.status > 201 || data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateLoanFee = createAsyncThunk(
  'update/loanFee',
  async (param: ILoanRow, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_loan_fee', param);
      if (data.status > 201 || data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
