import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchDBAList,
  createDBA,
  updateDBA,
  archiveDBA,
} from '../../../apiActions/config/dbaaction';

interface DBAItem {
  record_id: number;
  preferred_name: string;
  dba: string;
}

interface DBAState {
  dba_list: DBAItem[];
  count: number;
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
  isFormSubmitting: boolean;
}

const initialState: DBAState = {
  dba_list: [],
  count: 0,
  isSuccess: false,
  isLoading: false,
  error: null,
  isFormSubmitting: false,
};

const dbaSlice = createSlice({
  name: 'dba',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDBAList.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDBAList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dba_list = action.payload.list || []; // Use an empty array if list is undefined
        state.count = action.payload.count;
      })
      .addCase(fetchDBAList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(createDBA.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.isFormSubmitting = true;
      })
      .addCase(createDBA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isFormSubmitting = false;
      })
      .addCase(createDBA.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateDBA.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.isFormSubmitting = true;
      })
      .addCase(updateDBA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isFormSubmitting = false;
      })
      .addCase(updateDBA.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isFormSubmitting = false;
      })
      .addCase(archiveDBA.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(archiveDBA.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(archiveDBA.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetSuccess } = dbaSlice.actions;
export default dbaSlice.reducer;
