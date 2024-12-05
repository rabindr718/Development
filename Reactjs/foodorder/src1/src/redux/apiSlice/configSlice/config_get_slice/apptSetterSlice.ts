import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchApptSetters,
  updateApptSetters,
  createApttSetters,
} from '../../../apiActions/config/apptSetterAction';
import { RateAdjustment } from '../../../../core/models/api_models/RateAdjustmentModel';
import { toast } from 'react-toastify';

interface IState {
  data: any;
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: boolean;
  totalCount: number;
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: false,
  totalCount: 0,
};

const apptSetters = createSlice({
  name: 'Appt Setters',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApptSetters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchApptSetters.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload.list || [];
          state.totalCount = action.payload.count || 0;
        }
      )
      .addCase(fetchApptSetters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createApttSetters.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createApttSetters.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Form submitted successfully');
      })
      .addCase(createApttSetters.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateApptSetters.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateApptSetters.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Details updated successfully');
      })
      .addCase(updateApptSetters.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = apptSetters.actions;
export default apptSetters.reducer;
