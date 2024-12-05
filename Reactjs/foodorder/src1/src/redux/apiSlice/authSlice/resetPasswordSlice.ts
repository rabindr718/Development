import { createSlice } from '@reduxjs/toolkit';
import { generateOTP } from '../../apiActions/auth/authActions';

export interface ResetPasswordModel {
  email: string;
  loading?: boolean;
  error?: string | null;
  otp?: string;
  new_password?: string;
  message?: string;
}
const initialState: ResetPasswordModel = {
  loading: false,
  error: null,
  email: '',
  message: '',
  otp: '',
  new_password: '',
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { message } = action.payload;
        state.message = message;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'something went wrong';
      });
  },
});
export const { updateEmail } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
