import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchApAdv,
  updateApAdv,
  createApAdv,
} from '../../../apiActions/config/apAdvAction';

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

const apAdvSlice = createSlice({
  name: 'apAdvSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApAdv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApAdv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list || [];
        state.totalcount = action.payload.count;
      })
      .addCase(fetchApAdv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(createApAdv.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(createApAdv.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Create ApAdv created successfully');
      })
      .addCase(createApAdv.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateApAdv.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateApAdv.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Ap Adv updated successfully');
      })
      .addCase(updateApAdv.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = apAdvSlice.actions;

export default apAdvSlice.reducer;
