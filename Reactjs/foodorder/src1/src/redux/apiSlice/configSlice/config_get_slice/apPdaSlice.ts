import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchApPda,
  createApPda,
  updateApPda,
} from '../../../apiActions/config/apPdaAction';

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

const apPdaSlice = createSlice({
  name: 'apPdaSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApPda.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApPda.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list || [];
        state.totalcount = action.payload.count;
      })
      .addCase(fetchApPda.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createApPda.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createApPda.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Create ApPda created successfully');
      })
      .addCase(createApPda.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateApPda.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateApPda.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Ap Pda updated successfully');
      })
      .addCase(updateApPda.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = apPdaSlice.actions;

export default apPdaSlice.reducer;
