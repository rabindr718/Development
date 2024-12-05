// src/features/createLoanTypeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoanTypeModel } from '../../../../core/models/configuration/create/LoanTypeModel';

const initialState: LoanTypeModel = {
  record_id: 0,
  product_code: '',
  active: 1,
  adder: 0,
  description: '',
};

const createLoanTypeSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateLoanTypeForm(state, action: PayloadAction<Partial<LoanTypeModel>>) {
      return { ...state, ...action.payload };
    },
    loanTyperesetForm(state) {
      return initialState;
    },
  },
});

export const { updateLoanTypeForm, loanTyperesetForm } =
  createLoanTypeSlice.actions;
export default createLoanTypeSlice.reducer;
