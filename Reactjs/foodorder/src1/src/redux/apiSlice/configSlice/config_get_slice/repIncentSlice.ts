import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchRepIncent,
  createRepIncent,
  updateRepIncent,
} from '../../../apiActions/config/repIncentAction';

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  data: [];
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

const repIncentSlice = createSlice({
  name: 'repIncentSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepIncent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepIncent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list || [];
        state.count = action.payload.count;
      })
      .addCase(fetchRepIncent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createRepIncent.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createRepIncent.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Rep Incent created successfully');
      })
      .addCase(createRepIncent.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateRepIncent.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateRepIncent.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Rep Incent updated successfully');
      })
      .addCase(updateRepIncent.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = repIncentSlice.actions;

export default repIncentSlice.reducer;
