import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { SalesTypeModel } from '../../../../core/models/configuration/create/SalesTypeModel';

interface SalesTypeState {
  saletype_list: SalesTypeModel[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}
const initialState: SalesTypeState = {
  saletype_list: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchSalesType = createAsyncThunk(
  'salesType/fetchSalesType',
  async (data: any) => {
    const response = await postCaller(EndPoints.salesType, data);
    return response;
  }
);

const salesSlice = createSlice({
  name: 'salesType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.saletype_list
        ) {
          state.saletype_list = action.payload.data.saletype_list;
        } else {
          state.saletype_list = [];
        }
        state.totalCount = action.payload.dbRecCount || 0;
      })
      .addCase(fetchSalesType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch salesType data';
      });
  },
});

export default salesSlice.reducer;
