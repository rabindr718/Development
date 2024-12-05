import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { MarketingFeeModel } from '../../../../core/models/configuration/create/MarketingFeeModel';

interface MarketingState {
  marketing_fees_list: MarketingFeeModel[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}
const initialState: MarketingState = {
  marketing_fees_list: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchmarketingFees = createAsyncThunk(
  'marketing/fetchmarketingFees',
  async (data: any) => {
    const response = await postCaller(EndPoints.marketing, data);

    return response;
  }
);

const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchmarketingFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchmarketingFees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.marketing_fees_list
        ) {
          state.marketing_fees_list = action.payload.data.marketing_fees_list;
        } else {
          state.marketing_fees_list = [];
        }
        state.totalCount = action.payload.dbRecCount;
      })
      .addCase(fetchmarketingFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch marketing data';
      });
  },
});

export default marketingSlice.reducer;
