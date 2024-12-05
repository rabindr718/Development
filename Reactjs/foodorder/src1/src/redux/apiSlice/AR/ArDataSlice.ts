import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getAR, IGetArdata } from '../../apiActions/config/arAction';

interface IState {
  data: IGetArdata[];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: number;
  count: number;
  filters: {
    report_type: string;
    sale_partner: string;
    sort_by: string;
    shaky: boolean;
    cancel: boolean;
    sold: boolean;
    permits: boolean;
    ntp: boolean;
    install: boolean;
    pto: boolean;
  };
}

const initialState: IState = {
  data: [],
  error: '',
  isLoading: false,
  isFormSubmitting: false,
  isSuccess: 0,
  count: 0,
  filters: {
    report_type: 'ALL',
    sale_partner: 'ALL',
    sort_by: 'Partner',
    shaky: true,
    cancel: true,
    sold: true,
    permits: true,
    ntp: true,
    install: true,
    pto: true,
  },
};

const ArData = createSlice({
  name: 'AR DATA',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.isSuccess = 0;
    },
    handleChange: (
      state,
      action: PayloadAction<{ name: string; value: string | boolean }>
    ) => {
      state.filters = {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      };
    },
    toggleAllDropdown: (state) => {
      state.filters = {
        ...state.filters,
        shaky: true,
        cancel: true,
        permits: true,
        ntp: true,
        install: true,
        pto: true,
        sold: true,
      };
    },

    toggleOffDropdowns: (state) => {
      state.filters = {
        ...state.filters,
        shaky: false,
        cancel: false,
        permits: false,
        ntp: false,
        install: false,
        pto: false,
        sold: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAR.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAR.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.data = action.payload.list;
      })
      .addCase(getAR.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetSuccess,
  handleChange,
  toggleAllDropdown,
  toggleOffDropdowns,
} = ArData.actions;
export default ArData.reducer;
