import { createAsyncThunk } from '@reduxjs/toolkit';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { FilterModel } from '../../../core/models/data_models/FilterSelectModel';

interface Ipaginate {
  page_number: number;
  page_size: number;
  archived: boolean;
  filters: FilterModel[];
}

export interface IARSchedule {
  record_id: number;
  unique_id: string;
  partner_name: string;
  installer_name: string;
  sale_type_name: string;
  state_name: string;
  red_line: string;
  calc_date: string;
  permit_pay: string;
  permit_max: string;
  install_pay: string;
  pto_pay: string;
  is_archived: boolean;
  start_date: string;
  end_date: string;
}
interface SolarInstallation {
  partner_name: string;
  installer_name: string;
  sale_type_name: string;
  state_name: string;
  red_line: number;
  calc_date: string;
  permit_pay: number;
  permit_max: number;
  install_pay: number;
  pto_pay: number;
  start_date: string;
  end_date: string;
}

interface IUpdateParams extends SolarInstallation {
  record_id: number;
}
export const getArscheduleList = createAsyncThunk(
  'get/arschedule',
  async (param: Ipaginate, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_arschedule', param);
      const list = (data.data.ar_schedule_list as IARSchedule[]) || [];
      return { list, count: data?.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createArSchedule = createAsyncThunk(
  'create/arschedule',
  async (param: SolarInstallation, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('create_arschedule', param);
      if (data.status > 201 || data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateArchSchedule = createAsyncThunk(
  'update/arschedule',
  async (param: IUpdateParams, { rejectWithValue, dispatch }) => {
    try {
      const data = await postCaller('update_arschedule', param);
      if (data.status > 201 || data instanceof Error) {
        return rejectWithValue((data as Error).message);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
