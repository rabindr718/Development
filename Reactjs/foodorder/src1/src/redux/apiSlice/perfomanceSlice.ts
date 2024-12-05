import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { postCaller } from '../../infrastructure/web_api/services/apiUrl';
export interface IPerfomanceSale {
  type: string;
  sales: number;
  sales_kw: number;
}

export interface IProjectStatus {
  unqiue_id: any;
  contract_date: string;
  customer: string;
  permit_approved_date: string;
  install_completed_date: string;
  pto_date: string;
  site_survey_complete_date: string;
  install_ready_date: string;
}

export interface ICommision {
  SalesPeriod: number;
  cancellation_period: number;
  installation_period: number;
}

const isSessionTimeout = () => {
  const expirationTime = localStorage.getItem('expirationTime');
  const currentTime = Date.now();
  if (expirationTime) {
    if (currentTime > parseInt(expirationTime, 10)) {
      return true;
    }
  } else {
    return false;
  }
};

export const getPerfomance = createAsyncThunk(
  'get/perfomance',
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_perfomancemetrics', {
        start_data: params.startdate,
        end_date: params.enddate,
      });
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      const perfomaceSaleMetrics = (data?.data?.perfomance_sales_metrics ||
        []) as IPerfomanceSale[];
      const perfomaceCommisionMetrics = (data?.data
        ?.perfomance_commission_metrics || {}) as ICommision;
      return { perfomaceSaleMetrics, perfomaceCommisionMetrics };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getPerfomanceStatus = createAsyncThunk(
  'get/perfomancestatus',
  async (
    {
      page,
      perPage,
      startDate,
      endDate,
      uniqueId,
      selected_milestone,
      project_status,
      dealer_names,
      fieldData,
      minValue,
      maxValue

      
    }: {
      page: number;
      perPage: number;
      startDate: string;
      endDate: string;
      uniqueId?: any;
      selected_milestone: string;
      project_status: any;
      dealer_names: string[];
      fieldData:string[];
      minValue:number;
      maxValue:number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await postCaller('get_perfomanceprojectstatus', {
        page_size: perPage,
        page_number: page,
        start_date: startDate,
        end_date: endDate,
        ...(uniqueId && { unique_ids: [uniqueId] }),
        selected_milestone: selected_milestone,
        project_status: project_status,
        dealer_names,
        fields:fieldData,
 
        pending_start_date:minValue,
 
        pending_end_date:maxValue,
      });

      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }

      const datacount = data.data;
      const list = (data.data.perfomance_response_list ||
        []) as IProjectStatus[];

      return { list, count: data.dbRecCount, datacount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface IState {
  perfomaceSale: IPerfomanceSale[];
  error: string;
  isLoading: boolean;
  isSuccess: number;
  commisionMetrics: ICommision;
  projectStatus: any;
  projectsCount: number;
  datacount: any;
}

const initialState: IState = {
  perfomaceSale: [],
  error: '',
  isLoading: true,
  isSuccess: 0,
  commisionMetrics: {} as ICommision,
  projectStatus: [],
  projectsCount: 0,
  datacount: {},
};

const perfomanceSlice = createSlice({
  name: 'perfomanceSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPerfomance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPerfomance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.perfomaceSale = action.payload.perfomaceSaleMetrics;
        state.commisionMetrics = action.payload.perfomaceCommisionMetrics;
        console.log(isSessionTimeout(), 'jbjhbghbghb');
      })
      .addCase(getPerfomance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        const session = isSessionTimeout();
        if (!session) {
          toast.error(action.payload as string);
        }
      })

      .addCase(getPerfomanceStatus.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPerfomanceStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectStatus = action.payload.list;
        state.projectsCount = action.payload.count;
        state.datacount = action.payload.datacount;
      })
      .addCase(getPerfomanceStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        const session = isSessionTimeout();
        if (!session) {
          toast.error(action.payload as string);
        }
      });
  },
});

export const { resetSuccess } = perfomanceSlice.actions;
export default perfomanceSlice.reducer;
