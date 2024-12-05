import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAutoAdder } from '../../../apiActions/config/AutoAdderAction';
import { toast } from 'react-toastify';

interface IState {
  data: any;
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: boolean;
  dbCount: number;
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: false,
  dbCount: 0,
};

const autoAdder = createSlice({
  name: 'Auto Adder',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAutoAdder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAutoAdder.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.data = action.payload.list;
          state.dbCount = action.payload.count;
          console.log(action.payload);
        }
      )
      .addCase(fetchAutoAdder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess } = autoAdder.actions;
export default autoAdder.reducer;
