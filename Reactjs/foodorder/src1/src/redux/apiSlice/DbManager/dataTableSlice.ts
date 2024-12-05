import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getDataTableName,
  getAnyTableData,
} from '../../../redux/apiActions/dataTableAction';
import { toast } from 'react-toastify';

interface IState {
  option: { table_name: string }[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  tableData: [];
  isSuccess: number;
  dbCount: number;
}
const initialState: IState = {
  isLoading: false,
  isFormSubmitting: false,
  error: '',
  option: [],
  tableData: [],
  isSuccess: 0,
  dbCount: 0,
};

const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
    resetOpt: (state) => {
      state.option = [];
      state.tableData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataTableName.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDataTableName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.option = action.payload || [];
      })
      .addCase(getDataTableName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAnyTableData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAnyTableData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tableData = action.payload.tableData || [];
        state.dbCount = action.payload.count;
      })
      .addCase(getAnyTableData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetSuccess, resetOpt } = dataTableSlice.actions;
export default dataTableSlice.reducer;
