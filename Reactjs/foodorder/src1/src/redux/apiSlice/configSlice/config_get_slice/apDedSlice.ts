import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchApDed,
  updateApDed,
  createApDed,
} from '../../../apiActions/config/apDedAction';

interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  data: [];
  isSuccess: boolean;
  totalcount: number;
}

const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  data: [],
  isSuccess: false,
  totalcount: 0,
};

const apDedSlice = createSlice({
  name: 'apDedSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApDed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApDed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list || [];
        state.totalcount = action.payload.count || [];
      })
      .addCase(fetchApDed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createApDed.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createApDed.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Create ApDed created successfully');
      })
      .addCase(createApDed.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateApDed.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateApDed.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Ap Ded updated successfully');
      })
      .addCase(updateApDed.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = apDedSlice.actions;

export default apDedSlice.reducer;
