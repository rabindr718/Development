import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDealerPay,
  getDealerPayTileData,
} from '../../apiActions/dealerPayAction';
import { toast } from 'react-toastify';

interface TileData {
  amount_prepaid: number;
  current_due: number;
  pipeline_remaining: number;
}

// Define the interface for the initial state
interface DealerPayState {
  loading: boolean;
  data: any[]; // Adjust 'any' if you have more specific data structure
  count: number;
  error: string;
  tileData: any;
}

// Initialize the state with type safety
const initialState: DealerPayState = {
  loading: false,
  data: [],
  count: 0,
  error: '',
  tileData:{}
};



const dealerPaySlice = createSlice({
  name: 'dealerPaySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDealerPay.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDealerPay.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload?.list, "dtaaaaa")
      state.data = action.payload?.list;
      state.count = action.payload?.count;
      state.tileData = action.payload?.tileData
    });
    builder.addCase(getDealerPay.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });
    builder.addCase(getDealerPayTileData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDealerPayTileData.fulfilled, (state, action) => {
      state.loading = false;
      state.tileData = action.payload;
      console.log(action.payload, 'payload search');
    });
    builder.addCase(getDealerPayTileData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error(action.payload as string);
    });
  },
});

export default dealerPaySlice.reducer;
