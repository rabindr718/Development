// src/features/createTierLoanFeeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TierLoanFeeModel } from '../../../../core/models/configuration/create/TierLoanFeeModel';

const initialState: TierLoanFeeModel = {
  record_id: 0,
  dealer_tier: '',
  installer: '',
  state: '',
  loan_type: '',
  owe_cost: '',
  dlr_mu: '',
  dlr_cost: '',
  start_date: '',
  end_date: '',
};

const createTierLoanFeeSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateTierLoanForm(
      state,
      action: PayloadAction<Partial<TierLoanFeeModel>>
    ) {
      return { ...state, ...action.payload };
    },
    tierresetForm(state) {
      return initialState;
    },
  },
});

export const { updateTierLoanForm, tierresetForm } =
  createTierLoanFeeSlice.actions;
export default createTierLoanFeeSlice.reducer;
