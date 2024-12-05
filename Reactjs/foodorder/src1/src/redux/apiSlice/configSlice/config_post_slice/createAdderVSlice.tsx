// src/features/createAdderVSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdderVModel } from '../../../../core/models/configuration/create/AdderVModel';

const initialState: AdderVModel = {
  record_id: 0,
  active: 1,
  adder_name: '',
  adder_type: '',
  description: '',
  price_amount: '',
  price_type: '',
};

const createAdderVSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateAdderV(state, action: PayloadAction<Partial<AdderVModel>>) {
      return { ...state, ...action.payload };
    },
    adderResetForm(state) {
      return initialState;
    },
  },
});

export const { updateAdderV, adderResetForm } = createAdderVSlice.actions;
export default createAdderVSlice.reducer;
