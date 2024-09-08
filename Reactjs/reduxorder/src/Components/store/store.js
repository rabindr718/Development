import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../redux/userReducer";
export const store = configureStore({
  //   user: UserReducer,
  reducer: {
    users: UserReducer,
  },
});
