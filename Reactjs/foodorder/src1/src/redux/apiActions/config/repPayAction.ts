import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';

export interface RepayEditParams {
  name: string;
  state: string;
  pay_scale: string;
  position: string;
  b_e: boolean;
  start_date: string;
  end_date: string;
  RecordId: string;
}

interface RepayCreateParams {
  name: string;
  state: string;
  pay_scale: String;
  position: string;
  b_e: boolean;
  start_date: string;
  end_date: string;
}
interface RepayUpdateParams extends RepayCreateParams {
  record_id: number;
}
export const fetchRepaySettings = createAsyncThunk(
  'repaySettings/fetchrepaySettings',
  async (data: any) => {
    const response = await postCaller(EndPoints.repPaySettings, data);

    return response;
  }
);

export const createRepaySettings = createAsyncThunk(
  'create/repay-settings',
  async (params: RepayCreateParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller(EndPoints.create_repaysettings, params);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRepaySettings = createAsyncThunk(
  'update/repaysetting',
  async (param: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_rep_pay_settings', param);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
