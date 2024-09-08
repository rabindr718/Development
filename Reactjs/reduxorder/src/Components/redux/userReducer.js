import { createSlice } from "@reduxjs/toolkit";
import { dataArray } from "../Services/api";

const userSlice = createSlice({
  name: "users",
  initialState: dataArray,
  reducers: {},
});
export default userSlice.reducer;
