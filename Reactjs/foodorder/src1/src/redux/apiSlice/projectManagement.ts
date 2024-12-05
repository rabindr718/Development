import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { postCaller } from '../../infrastructure/web_api/services/apiUrl';
export interface IPerfomanceSale {
  Type: string;
  sales: number;
  sales_kw: number;
}

interface Project {
  unique_id: string;
  sales_completed: string;
  ntp_pending: string;
  ntp_completed: string;
  site_survey_scheduled: string;
  site_survey_rescheduled: string;
  site_survey_completed: string;
  roofing_pending: string;
  roofing_scheduled: string;
  roofing_completed: string;
  electrical_pending: string;
  electrical_scheduled: string;
  electrical_completed: string;
  pv_permit_pending: string;
  pv_permit_scheduled: string;
  pv_permit_completed: string;
  ic_permit_pending: string;
  ic_permit_scheduled: string;
  ic_permit_completed: string;
  install_pending: string;
  install_ready: string;
  install_scheduled: string;
  install_completed: string;
  final_inspection_submitted: string;
  final_inspection_approved: string;
  pto_in_process: string;
  pto_submitted: string;
  pto_completed: string;
  SystemSize: number;
  adder: string;
  ajh: string;
  epc: string;
  state: string;
  contract_amount: number;
  finance_partner: string;
  net_epc: number;
}

interface IProject {
  unqiue_id: string;
  sales_completed: string;
  ntp_pending: string;
  ntp_completed: string;
  site_survey_scheduled: string;
  site_survey_rescheduled: string;
  site_survey_completed: string;
  roofing_pending: string;
  roofing_scheduled: string;
  roofing_completed: string;
  electrical_pending: string;
  electrical_scheduled: string;
  electrical_completed: string;
  pv_permit_pending: string;
  pv_permit_scehduled: string;
  pv_permit_completed: string;
  ic_permit_pending: string;
  ic_permit_scheduled: string;
  ic_permit_completed: string;
  install_pending: string;
  install_ready: string;
  install_scheduled: string;
  install_completed: string;
  final_inspection_submitted: string;
  final_inspection_approved: string;
  pto_in_process: string;
  pto_submitted: string;
  pto_completed: string;
  SystemSize: number;
  adder: string;
  ajh: string;
  epc: string;
  state: string;
  contract_amount: number;
  finance_partner: string;
  net_epc: number;
  home_owner: string;
}

export interface IProjects {
  unqiue_id: string;
  customer: string;
}

export const getProjects = createAsyncThunk(
  'get/projects',
  async (_, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_projectmanagementlist', {});
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      const projects = (data?.data || []) as IProjects[];
      return { projects, count: data.dbRecCount };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getProjectDetail = createAsyncThunk(
  'get/projectDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await postCaller('get_projectmgmnt', { unique_id: id });
      if (data.status > 201) {
        return rejectWithValue((data as Error).message);
      }
      const project = (data?.data?.project_response_list?.[0] ||
        {}) as IProject;
      const otherlinks = data?.data;
      return { project, otherlinks };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface IState {
  projects: IProjects[];
  error: string;
  isLoading: boolean;
  projectsCount: number;
  projectDetail: IProject;
  otherlinks: any;
}

const initialState: IState = {
  projects: [],
  error: '',
  isLoading: false,
  projectsCount: 0,
  projectDetail: {} as IProject,
  otherlinks: {},
};

const projectManagementSlice = createSlice({
  name: 'projectManagementSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.projects;
        state.projectsCount = action.payload.count;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getProjectDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectDetail = action.payload.project;
        state.otherlinks = action.payload.otherlinks;
      })
      .addCase(getProjectDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export default projectManagementSlice.reducer;
