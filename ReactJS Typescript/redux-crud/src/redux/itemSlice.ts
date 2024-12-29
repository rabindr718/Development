// src/redux/itemSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// src/redux/itemSlice.ts

interface Item {
  id: number;
  name: string;
}

interface ItemState {
  items: Item[]; // Make sure it's initialized as an empty array
}

// src/redux/itemSlice.ts
const initialState: ItemState = {
  items: [],
};

// src/redux/itemSlice.ts
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ name: string }>) => {
      const newItem: Item = { id: Date.now(), name: action.payload.name };
      state.items.push(newItem); // Add the new item to the array
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].name = action.payload.name;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
