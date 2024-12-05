import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createAdjustments,
  getAdjustments,
  updateAdjustments,
} from '../../../apiActions/config/arAdjustmentsAction';
import { Adjustment } from '../../../../core/models/api_models/ArAdjustMentsModel';
import { toast } from 'react-toastify';

interface IState {
  data: Adjustment[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: boolean;
  count: number;
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: false,
  count: 0,
};

const rateAdjustments = createSlice({
  name: 'arAdjustments',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdjustments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAdjustments.fulfilled,
        (
          state,
          action: PayloadAction<{ list: Adjustment[]; count: number } | null>
        ) => {
          state.isLoading = false;
          state.data = action.payload?.list ? action.payload?.list : [];
          state.count = action.payload?.count || 0;
        }
      )
      .addCase(getAdjustments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createAdjustments.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createAdjustments.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Form submitted successfully');
      })
      .addCase(createAdjustments.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      .addCase(updateAdjustments.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateAdjustments.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Form submitted successfully');
      })
      .addCase(updateAdjustments.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetSuccess } = rateAdjustments.actions;

export default rateAdjustments.reducer;
