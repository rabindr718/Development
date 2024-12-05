import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
interface IState {
  isActive: { [key: string]: boolean };
}
const initialState: IState = {
  isActive: {},
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    disableFilter: (state, action: PayloadAction<{ name: string }>) => {
      if (action.payload.name in state.isActive) {
        const obj = { ...state.isActive };
        delete obj[action.payload.name];
        state.isActive = obj;
      }
    },
    activeFilter: (state, action: PayloadAction<{ name: string }>) => {
      state.isActive[action.payload.name] = true;
    },
  },
});

export const { disableFilter, activeFilter } = filterSlice.actions;
export default filterSlice.reducer;
