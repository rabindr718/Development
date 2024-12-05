import { createSlice } from '@reduxjs/toolkit';
import {
  getInstallCost,
  createInstallCost,
  ICost,
  updateInstallCost,
} from '../../../apiActions/config/installCostAction';
import { toast } from 'react-toastify';

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  data: ICost[];
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

const installCost = createSlice({
  name: 'installCost',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstallCost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getInstallCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.dbCount = action.payload.count;
      })
      .addCase(getInstallCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createInstallCost.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createInstallCost.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        state.error = '';
        toast.success('Form submission completed');
      })
      .addCase(createInstallCost.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })

      .addCase(updateInstallCost.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateInstallCost.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Form submission completed');
      })
      .addCase(updateInstallCost.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = installCost.actions;

export default installCost.reducer;
