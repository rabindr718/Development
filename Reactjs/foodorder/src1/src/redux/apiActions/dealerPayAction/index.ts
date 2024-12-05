import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { FilterModel } from '../../../core/models/data_models/FilterSelectModel';
import { configPostCaller } from '../../../infrastructure/web_api/services/apiUrl';
interface Ipaginate {
  page_number: number;
  page_size: number;
  pay_roll_start_date?: string;
  pay_roll_end_date?: string;
  use_cutoff?: string;
  dealer_name?: string;
  sort_by?: string;
  commission_model: string;
  filters: FilterModel[];
  preffered_type: string;
}

export const getDealerPay = createAsyncThunk(
  'get/dealer-pay',
  async (params: any, { rejectWithValue }) => {
    try {
      const resp = await configPostCaller('get_dealerpaycommissions', params);
      if (resp.status > 201) {
        return rejectWithValue(resp.message);
      }
      const count = resp.dbRecCount || 0;
      const tileData = resp.data
      const list = resp.data.DealerPayComm  || [];
      return { count, list , tileData};
    } catch (error) {
      rejectWithValue((error as Error).message);
    }
  }
);

export const getDealerPayTileData = createAsyncThunk(
  'get/dealer-pay-tile-data',
  async (params: { dealer: string }, { rejectWithValue }) => {
    try {
      const resp = await postCaller('get_dlrpay_tiledata', {
        ALL: params.dealer,
      });
      console.log(resp, 'tile action');
      if (resp.status > 201) {
        return rejectWithValue(resp.message);
      }
      return resp.data;
    } catch (error) {
      rejectWithValue((error as Error).message);
    }
  }
);
