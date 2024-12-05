import { createSlice } from '@reduxjs/toolkit';
import {
  getarAdderData,
  createarAdderData,
  IAdderRowData,
  updatearAdderData,
} from '../../../apiActions/config/arAdderDataAction';
import { toast } from 'react-toastify';

interface IState {
  data: IAdderRowData[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
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

const adderData = createSlice({
  name: 'adderData',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getarAdderData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getarAdderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.count = action.payload.count;
      })
      .addCase(getarAdderData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createarAdderData.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createarAdderData.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Form submission completed');
      })
      .addCase(createarAdderData.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updatearAdderData.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updatearAdderData.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Details updated successfully');
      })
      .addCase(updatearAdderData.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});
export const { resetSuccess } = adderData.actions;
export default adderData.reducer;
