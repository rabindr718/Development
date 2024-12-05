// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { loginAction } from '../../apiActions/auth/authActions';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { set } from 'date-fns';

interface AuthState {
  loading: boolean;
  error: null | string;
  email_id: string | null;
  role_name: string | null;
  access_token: string | null;
  isAuthenticated: boolean;
  isPasswordChangeRequired: boolean;
  status: number | null;
  sessionTimeout: boolean;
  microsoftGraphAccessToken: string
}

const initialState: AuthState = {
  loading: false,
  error: null,
  email_id: localStorage.getItem('email'),
  role_name: localStorage.getItem('role'),
  access_token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') ? true : false,
  status: null,
  isPasswordChangeRequired: localStorage.getItem('isPasswordChangeRequired')
    ? true
    : false,
  sessionTimeout: false,
  microsoftGraphAccessToken: Cookies.get('myToken') || ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    activeSessionTimeout: (state) => {
      state.sessionTimeout = true;
    },

    diableSessionTimeout: (state) => {
      state.sessionTimeout = false;
    },
    logout(state) {
      state.email_id = null;
      state.role_name = null;
      state.access_token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('role');
    },
    initializeAuth(state) {
      state.isAuthenticated = state.access_token !== null;
    },
    setToken(state, action) {
      state.microsoftGraphAccessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state: AuthState, action) => {
        state.loading = false;
        state.error = null;
        state.sessionTimeout = false;
        console.log(' action.payload........', action.payload);

        const { status, data } = action.payload;
        if (status === HTTP_STATUS.OK) {
          // on succesfull login dismiss previous toasters
          toast.dismiss();

          state.email_id = data.email_id;
          state.role_name = data.role_name;
          state.access_token = data.access_token;
          state.isAuthenticated = true;
          state.isPasswordChangeRequired = data.isPasswordChangeRequired;
        }
      })
      .addCase(loginAction.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unable to login User';
        // on succesfull logout dismiss previous toasters
        toast.dismiss();
      });
  },
});

export const {
  logout,
  initializeAuth,
  activeSessionTimeout,
  diableSessionTimeout,
  setToken
} = authSlice.actions;
export default authSlice.reducer;
