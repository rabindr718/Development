import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getTeams,
  getTeam,
  getSalesManagerList,
  getsaleRepList,
  createTeam,
  manageTeam,
  getTeamMemberDropdown,
} from '../../apiActions/teamManagement/teamManagement';

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  teams: any[];
  team: any;
  sales_manager_list: any[];
  sale_rep_list: any[];
  isSuccess: boolean;
  isMove: boolean;
  totalcount: number;
  team_dropdown: any[];
}

const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  teams: [],
  team: {},
  sales_manager_list: [],
  sale_rep_list: [],
  isSuccess: false,
  isMove: false,
  totalcount: 0,
  team_dropdown: [],
};

const teamManagementSlice = createSlice({
  name: 'teamManagmentSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
      state.isMove = false;
    },
    resetTeams: (state) => {
      state.teams = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload.list || [];
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.team = action.payload.data;
        state.totalcount = action.payload.dbRecCount;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getSalesManagerList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesManagerList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales_manager_list = action.payload.data.users_name_list || [];
      })
      .addCase(getSalesManagerList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getsaleRepList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getsaleRepList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sale_rep_list = action.payload.data.sale_rep_list || [];
      })
      .addCase(getsaleRepList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createTeam.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        state.error = '';
        toast.success('Team Created Successfully');
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(manageTeam.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(manageTeam.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isMove = true;
        state.error = '';
        toast.success('Moved Successfully');
      })
      .addCase(manageTeam.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      .addCase(getTeamMemberDropdown.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(getTeamMemberDropdown.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.team_dropdown = action.payload;
        state.error = '';
      })
      .addCase(getTeamMemberDropdown.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess, resetTeams } = teamManagementSlice.actions;

export default teamManagementSlice.reducer;
