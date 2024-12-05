// src/features/createCommissionSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommissionModel } from '../../../../core/models/configuration/create/CommissionModel';

const initialState: CommissionModel = {
  record_id: 0,
  partner: '',
  installer: '',
  state: '',
  sale_type: '',
  sale_price: 0,
  rep_type: '',
  rl: 0,
  rate: 0,
  start_date: '',
  end_date: '',
};

const createCommissionSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<CommissionModel>>) {
      return { ...state, ...action.payload };
    },
    resetForm(state) {
      return initialState;
    },
  },
});

export const { updateForm, resetForm } = createCommissionSlice.actions;
export default createCommissionSlice.reducer;
