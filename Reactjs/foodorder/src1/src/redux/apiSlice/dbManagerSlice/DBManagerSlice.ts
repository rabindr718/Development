import { createSlice } from '@reduxjs/toolkit';
import { fetchDBManagerUserActivity } from '../../apiActions/DBManagerAction/DBManagerAction';
import { DBManagerStateModel } from '../../../core/models/data_models/DBManagerStateModel';

const initialState: DBManagerStateModel = {
  loading: false,
  error: null,
  userActivityList: [],
  totalCount: 0,
};

const DBManagerSlice = createSlice({
  name: 'DBManager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDBManagerUserActivity.pending,
        (state: DBManagerStateModel) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchDBManagerUserActivity.fulfilled,
        (state: DBManagerStateModel, action) => {
          const { list, dbRecCount } = action.payload;
          state.loading = false;
          state.userActivityList = list;
          state.totalCount = dbRecCount;
          state.error = null;
        }
      )
      .addCase(
        fetchDBManagerUserActivity.rejected,
        (state: DBManagerStateModel, action) => {
          state.loading = false;
          state.error = action.error.message ?? 'Unable to fetch data';
        }
      );
  },
});

export default DBManagerSlice.reducer;
