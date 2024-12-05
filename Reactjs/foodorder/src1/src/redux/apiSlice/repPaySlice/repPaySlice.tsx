import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getRepPay } from '../../apiActions/repPayAction';

interface IState {
  data: [];
  error: string;
  isLoading: boolean;
  isFormSubmitting: boolean;
  isSuccess: number;
  count: number;
  filters: {
    pay_roll_start_date?: string;
    pay_roll_end_date?: string;
    use_cutoff?: string;
    report_type: string;
    sort_by?: string;
    commission_model: string;
    ap_oth: boolean;
    ap_pda: boolean;
    ap_ded: boolean;
    ap_adv: boolean;
    rep_comm: boolean;
    rep_bonus: boolean;
    leader_ovrd: boolean;
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
    pay_roll_start_date: '',
    pay_roll_end_date: '',
    use_cutoff: 'YES',
    report_type: 'All',
    sort_by: 'Partner',
    commission_model: 'standard',
    ap_oth: true,
    ap_pda: false,
    ap_ded: false,
    ap_adv: false,
    rep_comm: false,
    rep_bonus: false,
    leader_ovrd: false,
  },
};

const RepPayData = createSlice({
  name: 'REP PAY',
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
        ap_oth: true,
        ap_pda: true,
        ap_ded: true,
        ap_adv: true,
        rep_comm: true,
        rep_bonus: true,
        leader_ovrd: true,
      };
    },

    toggleOffDropdowns: (state) => {
      state.filters = {
        ...state.filters,
        ap_oth: false,
        ap_pda: false,
        ap_ded: false,
        ap_adv: false,
        rep_comm: false,
        rep_bonus: false,
        leader_ovrd: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRepPay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRepPay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload?.count || 0;
        state.data = action.payload?.list || [];
      })
      .addCase(getRepPay.rejected, (state, action) => {
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
} = RepPayData.actions;
export default RepPayData.reducer;
