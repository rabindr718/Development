import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { DealerTierModel } from '../../../../core/models/configuration/create/DealerTierModel';

interface DealerTierState {
  dealers_tier_list: DealerTierModel[];
  loading: boolean;
  error: string | null;
  dbCount: number;
}
const initialState: DealerTierState = {
  dealers_tier_list: [],
  loading: false,
  error: null,
  dbCount: 0,
};

export const fetchDealerTier = createAsyncThunk(
  'dealerTier/fetchDealerTier',
  async (data: any) => {
    const response = await postCaller(EndPoints.dealerTier, data);

    return response;
  }
);

const dealerTierSlice = createSlice({
  name: 'dealerTier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDealerTier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDealerTier.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.dealers_tier_list
        ) {
          state.dealers_tier_list = action.payload.data.dealers_tier_list;
          state.dbCount = action.payload.dbRecCount;
        } else {
          state.dealers_tier_list = [];
        }
      })
      .addCase(fetchDealerTier.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch DealerTierModel data';
      });
  },
});

export default dealerTierSlice.reducer;
