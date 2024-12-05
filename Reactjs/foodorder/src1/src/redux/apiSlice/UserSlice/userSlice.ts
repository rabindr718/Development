import { createSlice } from '@reduxjs/toolkit';
import { getUser, updateUser } from '../../apiActions/GetUser/getUserAction';

interface IState {
  userDetail: any;
  userUpdate: any;
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: number;
  count: number;
}

const initialState: IState = {
  userDetail: [],
  userUpdate: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: 0,
  count: 0,
};

const userData = createSlice({
  name: 'USER DATA',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetail = action.payload;
        // state.count = action.payload.count;
        // state.data = action.payload.list;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.userUpdate = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const updateData = createSlice({
  name: 'UPDATE DATA',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        state.userUpdate = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const updateDataReducer = updateData.reducer;
export default userData.reducer;
