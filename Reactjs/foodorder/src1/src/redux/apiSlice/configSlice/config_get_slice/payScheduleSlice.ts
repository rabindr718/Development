import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { PayScheduleModel } from '../../../../core/models/configuration/create/PayScheduleModel';

interface payScheduleState {
  payment_schedule_list: PayScheduleModel[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}
const initialState: payScheduleState = {
  payment_schedule_list: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchPaySchedule = createAsyncThunk(
  'paySchedule/fetchPaySchedule',
  async (data: any) => {
    const response = await postCaller(EndPoints.paySchedule, data);

    return response;
  }
);

const payScheduleSlice = createSlice({
  name: 'paySchedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaySchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaySchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.payment_schedule_list
        ) {
          state.payment_schedule_list =
            action.payload.data.payment_schedule_list;
        } else {
          state.payment_schedule_list = [];
        }
        state.totalCount = action.payload.dbRecCount;
      })
      .addCase(fetchPaySchedule.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch PayScheduleModel data';
      });
  },
});

export default payScheduleSlice.reducer;
