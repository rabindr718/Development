import { createSlice } from '@reduxjs/toolkit';
import {
  getDealerCredit,
  updateDealerCredit,
  createDealerCredit,
  DCredit,
} from '../../../apiActions/config/dealerCreditAction';
import { toast } from 'react-toastify';

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  data: DCredit[];
  isSuccess: boolean;
  dbCount: number;
}

const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  data: [],
  isSuccess: false,
  dbCount: 0,
};

const dealerCredit = createSlice({
  name: 'dealerCredit',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDealerCredit.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDealerCredit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.dbCount = action.payload.count;
      })
      .addCase(getDealerCredit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createDealerCredit.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createDealerCredit.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        state.error = '';
        toast.success('Dealer Credit Created Successfully');
      })
      .addCase(createDealerCredit.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      .addCase(updateDealerCredit.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateDealerCredit.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Dealer Credit Updated Successfully');
      })
      .addCase(updateDealerCredit.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = dealerCredit.actions;

export default dealerCredit.reducer;
