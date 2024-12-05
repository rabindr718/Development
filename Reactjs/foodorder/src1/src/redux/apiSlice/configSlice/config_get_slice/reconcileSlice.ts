import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createReconcile,
  fetchReconcile,
  updateReconcile,
} from '../../../apiActions/config/reconcileAction';
import { RateAdjustment } from '../../../../core/models/api_models/RateAdjustmentModel';
import { toast } from 'react-toastify';

interface IState {
  data: any;
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  dbCount: number;
  isSuccess: number;
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: 0,
  dbCount: 0,
};

const reconcile = createSlice({
  name: 'Reconcile',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReconcile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchReconcile.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload.list ? action.payload.list : [];
          state.dbCount = action.payload.count;
        }
      )
      .addCase(fetchReconcile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createReconcile.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createReconcile.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        toast.success('Form submitted successfully');
      })
      .addCase(createReconcile.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateReconcile.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateReconcile.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
      })
      .addCase(updateReconcile.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetSuccess } = reconcile.actions;

export default reconcile.reducer;
