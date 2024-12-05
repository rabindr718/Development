import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSlackConfigList,
  createSlackConfig,
  updateSlackConfig,
  deleteSlackConfig,
} from '../../../apiActions/config/slackConfigAction';

interface SlackConfigItem {
  record_id: number;
  issue_type: string;
  channel_name: string;
  bot_token: string;
  channel_id: string;
  slack_app_token: string;
}

interface SlackConfigState {
  slack_config_list: SlackConfigItem[];
  count: number;
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
  isFormSubmitting: boolean;
}

const initialState: SlackConfigState = {
  slack_config_list: [],
  count: 0,
  isSuccess: false,
  isLoading: false,
  error: null,
  isFormSubmitting: false,
};

const slackConfigSlice = createSlice({
  name: 'slack_config',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlackConfigList.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSlackConfigList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.slack_config_list = action.payload.list || []; // Use an empty array if list is undefined
        state.count = action.payload.count;
      })
      .addCase(fetchSlackConfigList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(createSlackConfig.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.isFormSubmitting = true;
      })
      .addCase(createSlackConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isFormSubmitting = false;
      })
      .addCase(createSlackConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateSlackConfig.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.isFormSubmitting = true;
      })
      .addCase(updateSlackConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isFormSubmitting = false;
      })
      .addCase(updateSlackConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isFormSubmitting = false;
      })
      .addCase(deleteSlackConfig.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSlackConfig.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteSlackConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetSuccess } = slackConfigSlice.actions;
export default slackConfigSlice.reducer;
