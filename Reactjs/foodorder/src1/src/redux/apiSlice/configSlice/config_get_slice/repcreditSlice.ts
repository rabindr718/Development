import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchRepCreditList,
  createRepCredit,
  updateRepCredit,
  archiveRepCredit,
} from '../../../apiActions/config/repCreditAction';

interface IRepCredit {
  record_id: string;
  Unique_id: string;
  Customer: string;
  Rep1: string;
  rep2: string;
  Date: string;
  Exact_amt: number;
  Per_kw_amt: number;
  Approved_by: string;
  Notes: string;
}

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  data: IRepCredit[];
  isSuccess: boolean;
  count: number;
}

const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  data: [],
  isSuccess: false,
  count: 0,
};

const repCreditSlice = createSlice({
  name: 'repCreditSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepCreditList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepCreditList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list || [];
        state.count = action.payload.count;
      })
      .addCase(fetchRepCreditList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createRepCredit.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createRepCredit.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Rep Credit created successfully');
      })
      .addCase(createRepCredit.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateRepCredit.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateRepCredit.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Rep Credit updated successfully');
      })
      .addCase(updateRepCredit.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(archiveRepCredit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(archiveRepCredit.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Rep Credit archived successfully');
      })
      .addCase(archiveRepCredit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = repCreditSlice.actions;

export default repCreditSlice.reducer;
