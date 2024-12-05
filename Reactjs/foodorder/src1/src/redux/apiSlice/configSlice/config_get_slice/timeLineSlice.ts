import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { TimeLineSlaModel } from '../../../../core/models/configuration/create/TimeLineSlaModel';

interface timeLineState {
  timelinesla_list: TimeLineSlaModel[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}
const initialState: timeLineState = {
  timelinesla_list: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchTimeLineSla = createAsyncThunk(
  'timeLineSla/fetchTimeLineSla',
  async (data: any) => {
    const response = await postCaller(EndPoints.timeLineSla, data);

    return response;
  }
);

const timeLineSlice = createSlice({
  name: 'timeLineSla',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeLineSla.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeLineSla.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalCount = action.payload.dbRecCount;
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.timelinesla_list
        ) {
          state.timelinesla_list = action.payload.data.timelinesla_list;
        } else {
          state.timelinesla_list = [];
        }
      })
      .addCase(fetchTimeLineSla.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Failed to fetch TimeLineSlaModel data';
      });
  },
});

export default timeLineSlice.reducer;
