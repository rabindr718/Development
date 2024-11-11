import { createSlice } from "@reduxjs/toolkit";
import { dataArray } from "../Services/api";

const userSlice = createSlice({
  name: "users",
  initialState: dataArray,
  reducers: {},
});
export default userSlice.reducer;

// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     list: dataArray,
//     selectedItem: null, 
//   },
//   reducers: {
//     setSelectedItem: (state, action) => {
//       state.selectedItem = action.payload;
//     },
//   },
// });

// export const { setSelectedItem } = userSlice.actions;
// export default userSlice.reducer;
