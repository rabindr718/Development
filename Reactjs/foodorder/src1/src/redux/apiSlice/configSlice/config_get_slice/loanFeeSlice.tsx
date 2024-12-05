import { createSlice } from '@reduxjs/toolkit';
import {
  getLoanFee,
  createLoanFee,
  ILoanRow,
  updateLoanFee,
} from '../../../apiActions/config/loanFeeActions';
import { toast } from 'react-toastify';

interface IState {
  data: ILoanRow[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
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

const loadFeeSlice = createSlice({
  name: 'loadFeeSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanFee.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLoanFee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.dbCount = action.payload.count;
        console.log(action.payload);
      })
      .addCase(getLoanFee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createLoanFee.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createLoanFee.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Form submission completed');
      })
      .addCase(createLoanFee.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateLoanFee.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateLoanFee.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Details updated successfully');
      })
      .addCase(updateLoanFee.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});
export const { resetSuccess } = loadFeeSlice.actions;
export default loadFeeSlice.reducer;
