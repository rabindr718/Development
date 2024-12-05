import { createSlice } from '@reduxjs/toolkit';

import { RepPaySettingsModel } from '../../../../core/models/configuration/create/RepPaySettingsModel';
import {
  fetchRepaySettings,
  createRepaySettings,
  updateRepaySettings,
} from '../../../apiActions/config/repPayAction';
import { toast } from 'react-toastify';

interface repaySettings {
  repPaySettingsList: RepPaySettingsModel[];
  loading: boolean;
  error: string | null;
  isFormSubmitting: boolean;
  isSuccess: number;
  dbCount: number;
  record_id: number | null;
}
const initialState: repaySettings = {
  repPaySettingsList: [],
  loading: false,
  error: null,
  isFormSubmitting: false,
  isSuccess: 0,
  record_id: 0,
  dbCount: 0,
};

const repaySettingSlice = createSlice({
  name: 'repaySettings',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepaySettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepaySettings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload, 'check');
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.rep_pay_settings_list
        ) {
          state.repPaySettingsList = action.payload.data.rep_pay_settings_list;
          state.dbCount = action.payload.dbRecCount;
        } else {
          state.repPaySettingsList = [];
        }
      })
      .addCase(fetchRepaySettings.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch RepPaySettings Data';
      })
      .addCase(createRepaySettings.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createRepaySettings.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        toast.success('Form submission completed');
      })
      .addCase(createRepaySettings.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateRepaySettings.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateRepaySettings.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        toast.success('Details updated successfully');
      })
      .addCase(updateRepaySettings.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});
export const { resetSuccess } = repaySettingSlice.actions;
export default repaySettingSlice.reducer;
