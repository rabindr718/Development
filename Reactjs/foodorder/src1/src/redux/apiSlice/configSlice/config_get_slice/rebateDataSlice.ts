import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchRebateData,
  createRebateData,
  updateRebateData,
} from '../../../apiActions/config/rebateDataAction';
import { toast } from 'react-toastify';

interface IState {
  data: any;
  error: string;
  count: number;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: boolean;
}

const initialState: IState = {
  data: [],
  error: '',
  count: 0,
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: false,
};

const rebateDataSlice = createSlice({
  name: 'Rebate Data Slice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRebateData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchRebateData.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload.list ? action.payload.list : [];
          state.count = action.payload.count;
        }
      )
      .addCase(fetchRebateData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createRebateData.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createRebateData.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(createRebateData.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateRebateData.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateRebateData.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Rebate data updated Successfully');
      })
      .addCase(updateRebateData.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = rebateDataSlice.actions;
export default rebateDataSlice.reducer;
