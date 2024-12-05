import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { TierLoanFeeModel } from '../../../../core/models/configuration/create/TierLoanFeeModel';

interface TierLoanState {
  tier_loan_fee_list: TierLoanFeeModel[];
  loading: boolean;
  error: string | null;
  dbCount: number;
}
const initialState: TierLoanState = {
  tier_loan_fee_list: [],
  loading: false,
  error: null,
  dbCount: 0,
};

export const fetchTearLoan = createAsyncThunk(
  'tierLoan/fetchTearLoan',
  async (data: any) => {
    const response = await postCaller(EndPoints.tierLoan, data);

    return response;
  }
);

const tearLoanSlice = createSlice({
  name: 'tierLoan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTearLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTearLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.tier_loan_fee_list
        ) {
          state.tier_loan_fee_list = action.payload.data.tier_loan_fee_list;
          state.dbCount = action.payload.dbRecCount;
        } else {
          state.tier_loan_fee_list = [];
        }
      })
      .addCase(fetchTearLoan.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch TierLoanFeeModel data';
      });
  },
});

export default tearLoanSlice.reducer;
