import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { AdderVModel } from '../../../../core/models/configuration/create/AdderVModel';

interface AdderVState {
  VAdders_list: AdderVModel[];
  loading: boolean;
  error: string | null;
}
const initialState: AdderVState = {
  VAdders_list: [],
  loading: false,
  error: null,
};

export const fetchAdderV = createAsyncThunk(
  'adderV/fetchAdderV',
  async (data: any) => {
    const response = await postCaller(EndPoints.adderV, data);

    return response;
  }
);

const adderSlice = createSlice({
  name: 'adderV',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdderV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdderV.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.VAdders_list
        ) {
          state.VAdders_list = action.payload.data.VAdders_list;
        } else {
          state.VAdders_list = [];
        }
      })
      .addCase(fetchAdderV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch adderV data';
      });
  },
});

export default adderSlice.reducer;
