// src/features/createTimeLineSlaSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimeLineSlaModel } from '../../../../core/models/configuration/create/TimeLineSlaModel';

const initialState: TimeLineSlaModel = {
  record_id: 0,
  type_m2m: '',
  state: '',
  days: '',
  start_date: '',
  end_date: '',
};

const createTimeLineSlaSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateTimeLineForm(
      state,
      action: PayloadAction<Partial<TimeLineSlaModel>>
    ) {
      return { ...state, ...action.payload };
    },
    timeLineresetForm(state) {
      return initialState;
    },
  },
});

export const { updateTimeLineForm, timeLineresetForm } =
  createTimeLineSlaSlice.actions;
export default createTimeLineSlaSlice.reducer;
