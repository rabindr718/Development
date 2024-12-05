import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createRateAdjustments,
  fetchRateAdjustments,
  updateRateAdjustment,
} from '../../../apiActions/config/RateAdjustmentsAction';
import { RateAdjustment } from '../../../../core/models/api_models/RateAdjustmentModel';
import { toast } from 'react-toastify';

interface IState {
  data: RateAdjustment[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  totalCount: number;
  isSuccess: number;
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: 0,
  totalCount: 0,
};

const rateAdjustments = createSlice({
  name: 'RateAdjustments',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRateAdjustments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchRateAdjustments.fulfilled,
        (
          state,
          action: PayloadAction<{ list: RateAdjustment[]; count: number }>
        ) => {
          state.isLoading = false;
          state.data = action.payload.list;
          state.totalCount = action.payload.count;
        }
      )
      .addCase(fetchRateAdjustments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createRateAdjustments.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createRateAdjustments.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        state.error = '';
        toast.success('Form submitted successfully');
      })
      .addCase(createRateAdjustments.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateRateAdjustment.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateRateAdjustment.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        toast.success('Details updated successfully');
      })
      .addCase(updateRateAdjustment.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = rateAdjustments.actions;
export default rateAdjustments.reducer;
