import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchAdderCredit,
  createAdderCredit,
  updateAdderCredit,
} from '../../../apiActions/config/adderCreditAction';
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

const adderCredit = createSlice({
  name: 'Adder Credit',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdderCredit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAdderCredit.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload?.data?.adder_credit_list
            ? action.payload.data.adder_credit_list
            : [];
          state.totalCount = action.payload.dbRecCount || 0;
        }
      )
      .addCase(fetchAdderCredit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createAdderCredit.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createAdderCredit.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(createAdderCredit.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      })
      .addCase(updateAdderCredit.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateAdderCredit.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(updateAdderCredit.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = adderCredit.actions;
export default adderCredit.reducer;
