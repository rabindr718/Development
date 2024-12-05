import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchApRep,
  updateApRep,
  createApRep,
} from '../../../apiActions/config/apRepAction';
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

const apRepSlice = createSlice({
  name: 'Ap Rep Slice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApRep.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchApRep.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload.list || [];
          state.totalCount = action.payload.count || 0;
        }
      )
      .addCase(fetchApRep.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createApRep.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createApRep.fulfilled, (state) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Ap-Rep created successfully');
      })
      .addCase(createApRep.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateApRep.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateApRep.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Ap-Rep updated successfully');
      })
      .addCase(updateApRep.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { resetSuccess } = apRepSlice.actions;
export default apRepSlice.reducer;
