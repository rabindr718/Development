import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchRepStatusList,
  createRepStatus,
  updateRepStatus,
  archiveRepStatus,
} from '../../../apiActions/config/repstatusAction';
import { toast } from 'react-toastify';

interface RepStatusItem {
  record_id: number;
  name: string;
  status: string;
}

interface RepStatusState {
  rep_status_list: RepStatusItem[];
  count: number;
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: RepStatusState = {
  rep_status_list: [],
  count: 0,
  isSuccess: false,
  isLoading: false,
  error: null,
};

const repStatusSlice = createSlice({
  name: 'repStatus',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepStatusList.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRepStatusList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rep_status_list = action.payload.list || [];
        state.count = action.payload.count;
        console.log('Fetched Rep Status List:', action.payload);
      })
      .addCase(fetchRepStatusList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(createRepStatus.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRepStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success('Rep Status created successfully');
      })
      .addCase(createRepStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(updateRepStatus.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRepStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success('Rep Status updated successfully');
      })
      .addCase(updateRepStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(archiveRepStatus.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(archiveRepStatus.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(archiveRepStatus.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = repStatusSlice.actions;
export default repStatusSlice.reducer;
