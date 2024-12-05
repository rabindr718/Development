import { createSlice } from '@reduxjs/toolkit';
import { checkUserExists } from '../../apiActions/auth/authActions';

export interface CheckUserExistsModel {
  loading: boolean;
  error: string | null;
  userExists: boolean | null;
}

const initialState: CheckUserExistsModel = {
  loading: false,
  error: null,
  userExists: null,
};

const CheckUserExistsSlice = createSlice({
  name: 'checkUserExists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserExists.pending, (state: CheckUserExistsModel) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        checkUserExists.fulfilled,
        (state: CheckUserExistsModel, action) => {
          state.loading = false;
          state.error = null;
          state.userExists = action.payload;
          console.log(action.payload);
        }
      )
      .addCase(
        checkUserExists.rejected,
        (state: CheckUserExistsModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Something went wrong';
        }
      );
  },
});

export default CheckUserExistsSlice.reducer;
