import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

// Define slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state: any, action: any) => {
      state.blogs.push(action.payload);
    },
  },
});

// Create store
const store = configureStore({
  reducer: blogSlice.reducer,
});

// Export action creator
export const { addBlog } = blogSlice.actions;

export default store;
