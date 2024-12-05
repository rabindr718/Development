import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchApOth,
  createApOth,
  updateApOth,
} from '../../../apiActions/config/apOthAction';

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

const apOthSlice = createSlice({
  name: 'apOthSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApOth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApOth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list || [];
        state.totalcount = action.payload.count;
      })
      .addCase(fetchApOth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createApOth.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createApOth.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Create ApOth created successfully');
      })
      .addCase(createApOth.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateApOth.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateApOth.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Ap Oth updated successfully');
      })
      .addCase(updateApOth.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = apOthSlice.actions;

export default apOthSlice.reducer;
