import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';

export interface RateAdjustmentsParams {
  position: string;
  adjustment: string;
  pay_scale: String;
  max_rate: number;
  min_rate: number;
  record_id?: number;
}
export const fetchRateAdjustments = createAsyncThunk(
  'rateadjustment/fetchrateadjustments',
  async (data: any) => {
    const response = await postCaller(EndPoints.rateAdjustments, data);
    const list = response.data.rate_adjustments_list || [];
    return { list, count: response.dbRecCount };
  }
);

export const createRateAdjustments = createAsyncThunk(
  'create/rate-adjustments',
  async (params: RateAdjustmentsParams, { rejectWithValue }) => {
    try {
      const response = await postCaller(
        EndPoints.create_rateadjustments,
        params
      );
      if (response.status > 201) {
        return rejectWithValue((response as Error).message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRateAdjustment = createAsyncThunk(
  'update/rateadjustment',
  async (param: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_rateadjustments', param);
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
