import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createAdderResponsibility,
  fetchAdderResponsibility,
  updateAdderResponsibility,
} from '../../../apiActions/config/adderResponsbilityAction';
import { RateAdjustment } from '../../../../core/models/api_models/RateAdjustmentModel';
import { toast } from 'react-toastify';

interface IState {
  data: any;
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: boolean;
  totalCount: number;
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: false,
  totalCount: 0,
};

const adderResponsibility = createSlice({
  name: 'Adder Responsibility',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdderResponsibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAdderResponsibility.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload.list || [];
          state.totalCount = action.payload.count;
        }
      )
      .addCase(fetchAdderResponsibility.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createAdderResponsibility.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createAdderResponsibility.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success(`Adder Responsibility created successfully`);
      })
      .addCase(createAdderResponsibility.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateAdderResponsibility.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateAdderResponsibility.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success(`Adder Responsibility updated successfully`);
      })
      .addCase(updateAdderResponsibility.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = adderResponsibility.actions;
export default adderResponsibility.reducer;
