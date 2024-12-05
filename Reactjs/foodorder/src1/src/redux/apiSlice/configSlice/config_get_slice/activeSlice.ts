import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { DealerModel } from '../../../../core/models/configuration/create/DealerModel';

interface Active {
  start_time: string | null;
  loading: boolean;
  error: string | null;
}
const initialState: Active = {
  start_time: null,
  loading: false,
  error: null,
};

export const fetchActive = createAsyncThunk('active/start_time', async () => {
  const response = await postCaller(EndPoints.active, {});

  return response;
});

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchActive.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?.data?.length > 0) {
          console.log(action.payload);
          state.start_time = action.payload.data[0].start_time;
        } else {
          state.start_time = null;
        }
      })
      .addCase(fetchActive.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message ?? 'Failed to fetch dealer data';
      });
  },
});

export default activeSlice.reducer;
