// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice";

const store = configureStore({
  reducer: {
    items: itemReducer, // Ensure this matches the state structure
  },
});

export default store;
