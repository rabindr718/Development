import { createSlice } from '@reduxjs/toolkit';
import { UserOnboardingStateModel } from '../../../core/models/data_models/UserManagementStateModel';
import {
  fetchUserListBasedOnRole,
  fetchUserOnboarding,
  createTablePermission,
  fetchDealerList,
} from '../../apiActions/userManagement/userManagementActions';

const initialState: UserOnboardingStateModel = {
  userOnboardingList: [],
  userRoleBasedList: [],
  dealerList: [],
  userPerformanceList: [],
  dbTables: [],
  loading: true,
  error: null,
  totalCount: 0,
  dealerCount: 0,
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    shuffleArray(state, action) {
      state.userRoleBasedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserOnboarding.pending,
        (state: UserOnboardingStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchUserOnboarding.fulfilled,
        (state: UserOnboardingStateModel, action) => {
          const { mapList, userPerformanceList } = action.payload;
          state.loading = false;
          state.error = null;

          state.userOnboardingList =
            mapList && mapList.length > 0 ? mapList : [];
          state.userPerformanceList =
            userPerformanceList && userPerformanceList.length
              ? userPerformanceList
              : [];
        }
      )
      .addCase(
        fetchUserOnboarding.rejected,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error =
            action.error.message ?? 'Unable to fetch Onboarding User';
        }
      )
      //get user based list
      .addCase(fetchDealerList.pending, (state: UserOnboardingStateModel) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDealerList.fulfilled,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.dealerList = action.payload.vdealers_list;
          state.dealerCount = action.payload.count;
        }
      )
      .addCase(
        fetchDealerList.rejected,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unable to fetch User list';
        }
      )

      //get user based list of dealer
      .addCase(
        fetchUserListBasedOnRole.pending,
        (state: UserOnboardingStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchUserListBasedOnRole.fulfilled,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.userRoleBasedList = action.payload.users_data_list.sort(
            (a: any, b: any) => a.user_code?.localeCompare?.(b.user_code)
          );
          state.totalCount = action.payload.count;
        }
      )
      .addCase(
        fetchUserListBasedOnRole.rejected,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unable to fetch User list';
        }
      )

      //  get db tables
      .addCase(
        createTablePermission.pending,
        (state: UserOnboardingStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        createTablePermission.fulfilled,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.dbTables = action.payload;
        }
      )
      .addCase(
        createTablePermission.rejected,
        (state: UserOnboardingStateModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unable to fetch User list';
        }
      );
  },
});
export const { shuffleArray } = userManagementSlice.actions;
export default userManagementSlice.reducer;
