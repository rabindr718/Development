import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CreateOnboardUserStateModel } from '../../../core/models/data_models/UserManagementStateModel';
import {
  createUserOnboarding,
  deleteUserOnboarding,
  deleteUserDealer,
  fetchDealerOwner,
  createDealer,
  fetchRegionList,
} from '../../apiActions/auth/createUserSliceActions';

const initialState: CreateOnboardUserStateModel = {
  loading: false,
  error: null,
  formData: {
    isEdit: false,
    first_name: '',
    last_name: '',
    email_id: '',
    mobile_number: '',
    zip_code: '',
    assigned_dealer_name: '',
    role_name: 'Admin',
    add_region: '',
    team_name: '',
    description: '',
    report_to: '',
    dealer_logo: '',
    dealer: '',
    assigned_Manager: '',
    dealer_code: '',
    preferred_name: '',
    podioChecked: false,
  },
  dealerOwenerList: [],
  regionList: [],
  createUserResult: null,
  deleteUserResult: null,
};

const createUserSlice = createSlice({
  name: 'CreateOnboardUser',
  initialState,
  reducers: {
    updateUserForm(
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) {
      const { field, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [field]: value,
        },
      };
    },

    userResetForm() {
      console.log('inititaste reset');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDealerOwner.pending,
        (state: CreateOnboardUserStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchDealerOwner.fulfilled,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.regionList = [];
          state.dealerOwenerList = action.payload;
        }
      )
      .addCase(
        fetchDealerOwner.rejected,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unable to fetch dealer Owener';
        }
      )
      /** get region list */
      .addCase(
        fetchRegionList.pending,
        (state: CreateOnboardUserStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchRegionList.fulfilled,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.regionList = action.payload;
        }
      )
      .addCase(
        fetchRegionList.rejected,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unable to fetch dealer Owener';
        }
      )
      /** create user */
      .addCase(createDealer.pending, (state: CreateOnboardUserStateModel) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDealer.fulfilled,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.createUserResult = action.payload;
        }
      )
      .addCase(
        createDealer.rejected,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error =
            action.error.message ?? 'Unable to create Onboarding User';
        }
      )

      /** create dealer user */
      .addCase(
        createUserOnboarding.pending,
        (state: CreateOnboardUserStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        createUserOnboarding.fulfilled,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.createUserResult = action.payload;
        }
      )
      .addCase(
        createUserOnboarding.rejected,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error =
            action.error.message ?? 'Unable to create Onboarding User';
        }
      )
      /** delete */
      /** create user */
      .addCase(
        deleteUserOnboarding.pending,
        (state: CreateOnboardUserStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteUserOnboarding.fulfilled,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error = null;
          state.deleteUserResult = action.payload;
        }
      )
      .addCase(
        deleteUserOnboarding.rejected,
        (state: CreateOnboardUserStateModel, action) => {
          state.loading = false;
          state.error =
            action.error.message ?? 'Unable to create Onboarding User';
        }
      );

    //delete user dealer
  },
});

export const { updateUserForm, userResetForm } = createUserSlice.actions;
export default createUserSlice.reducer;
