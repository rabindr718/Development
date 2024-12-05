import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getArscheduleList,
  IARSchedule,
  createArSchedule,
  updateArchSchedule,
} from '../../../apiActions/config/arScheduleAction';
import { toast } from 'react-toastify';

interface IState {
  data: IARSchedule[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: number;
  count: number;
}
const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  data: [],
  isSuccess: 0,
  count: 0,
};

const arSchedule = createSlice({
  name: 'arSchedule',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArscheduleList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getArscheduleList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.count = action.payload.count;
      })
      .addCase(getArscheduleList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createArSchedule.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createArSchedule.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        toast.success('Form submission completed');
      })
      .addCase(createArSchedule.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateArchSchedule.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateArchSchedule.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = 1;
        toast.success('Details updated successfully');
      })
      .addCase(updateArchSchedule.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});
export const { resetSuccess } = arSchedule.actions;
export default arSchedule.reducer;
