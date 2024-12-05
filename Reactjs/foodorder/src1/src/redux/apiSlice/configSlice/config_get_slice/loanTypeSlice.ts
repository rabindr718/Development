import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { LoanTypeModel } from '../../../../core/models/configuration/create/LoanTypeModel';

interface loanTypeState {
  loantype_list: LoanTypeModel[];
  loading: boolean;
  error: string | null;
  count: number;
}
const initialState: loanTypeState = {
  loantype_list: [],
  loading: false,
  error: null,
  count: 0,
};

export const fetchLoanType = createAsyncThunk(
  'loanType/fetchLoanType',
  async (data: any) => {
    const response = await postCaller(EndPoints.loanType, data);

    return response;
  }
);

const loanTypeSlice = createSlice({
  name: 'loanType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.loantype_list
        ) {
          state.loantype_list = action.payload.data.loantype_list;
        } else {
          state.loantype_list = [];
        }
        state.count = action.payload.dbRecCount || 0;
      })
      .addCase(fetchLoanType.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch LoanTypeModel data';
      });
  },
});

export default loanTypeSlice.reducer;
