import { createSlice } from '@reduxjs/toolkit';
import {
  getNonComm,
  createNonComm,
  updateNoncom,
  INonCommRowDLR,
} from '../../../apiActions/config/nocCommAction';
import { toast } from 'react-toastify';

interface IState {
  data: INonCommRowDLR[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: boolean;
  dbCount: number;
}
const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  data: [],
  isSuccess: false,
  dbCount: 0,
};

const nonComm = createSlice({
  name: 'nonComm',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNonComm.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getNonComm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.list;
        state.dbCount = action.payload.count;
        console.log(action.payload);
      })
      .addCase(getNonComm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createNonComm.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(createNonComm.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Non Comm Created Successfully');
      })
      .addCase(createNonComm.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateNoncom.pending, (state, action) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateNoncom.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.isSuccess = true;
        toast.success('Non Comm updated successfully');
      })
      .addCase(updateNoncom.rejected, (state, action) => {
        state.isFormSubmitting = false;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      });
  },
});
export const { resetSuccess } = nonComm.actions;
export default nonComm.reducer;
