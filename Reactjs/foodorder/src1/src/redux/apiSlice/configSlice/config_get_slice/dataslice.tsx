import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { dataModel } from '../../../../core/models/configuration/create/dataModel';

interface dataState {
  dataList: dataModel[];
  loading: boolean;
  error: string | null;
}
const initialState: dataState = {
  dataList: [],
  loading: false,
  error: null,
};
interface FetchCommissionsWithFiltersArgs {
  page_number: number;
  page_size: number;
  filters: any[];
}
export const fetchData = createAsyncThunk('', async (data: any, thunkAPI) => {
  const response = await postCaller(EndPoints.commission, data);
  return response;
});

// Define fetchCommissions async thunk without filters

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.commissions_list
        ) {
          state.dataList = action.payload.data.data_list;
        } else {
          state.dataList = [];
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch commissions data';
      });
  },
});

export default dataSlice.reducer;
