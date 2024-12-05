import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createleaderOverride,
  getleaderOverride,
  updateleaderOverride,
  ILeaderRow,
} from '../../../apiActions/config/leaderOverrideAction';
interface IState {
  isLoading: boolean;
  isFormSubmitting: boolean;
  error: string;
  data: ILeaderRow[];
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

const leaderOverride = createSlice({
  name: 'leaderOverride',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getleaderOverride.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getleaderOverride.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.error = '';
        state.count = action.payload.count;
      })
      .addCase(getleaderOverride.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });

    builder
      .addCase(createleaderOverride.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createleaderOverride.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        // toast.success('Form submission completed');
      })
      .addCase(createleaderOverride.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
        console.log('error block');
      })

      .addCase(updateleaderOverride.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateleaderOverride.fulfilled, (state, action) => {
        // toast.success('Leader Override updated successfully');
        state.isFormSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(updateleaderOverride.rejected, (state, action) => {
        toast.error(action.payload as string);
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = leaderOverride.actions;

export default leaderOverride.reducer;
