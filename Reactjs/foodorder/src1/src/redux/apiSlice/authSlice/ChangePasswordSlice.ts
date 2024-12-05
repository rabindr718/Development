import { createSlice } from '@reduxjs/toolkit';
import { changePasswordAction } from '../../apiActions/auth/authActions';

export interface ResetPasswordModel {
  loading: boolean;
  error: string | null;
  changePasswordResult: null;
}
const initialState: ResetPasswordModel = {
  loading: false,
  error: null,
  changePasswordResult: null,
};

const ChangePasswordSlice = createSlice({
  name: 'chnagePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAction.pending, (state: ResetPasswordModel) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changePasswordAction.fulfilled,
        (state: ResetPasswordModel, action) => {
          state.loading = false;
          state.error = null;
          state.changePasswordResult = action.payload;
          console.log(action.payload);
        }
      )
      .addCase(
        changePasswordAction.rejected,
        (state: ResetPasswordModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'something went wrong';
        }
      );
  },
});

export default ChangePasswordSlice.reducer;
