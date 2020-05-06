import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  initialState: {
    movements: [],
    items: [],
    surveys: [],
  },
  name: "main",
  reducers: {
    setCollection: (state, action) => {
      state[action.payload.collection] = action.payload.data;
    },
    createItem: (state, action) => {
      state[action.payload.collection].push(action.payload.data);
    },
    deleteItem: (state, action) => {
      const index = state[action.payload.collection].findIndex(
        (item) => item._id === action.payload.id
      );
      state[action.payload.collection].splice(index, 1);
    },
    updateItem: (state, action) => {
      const index = state[action.payload.collection].findIndex(
        (item) => item._id === action.payload.id
      );
      state[action.payload.collection][index] = action.payload.data;
    },
  },
});

export const {
  createItem,
  deleteItem,
  setCollection,
  updateItem,
} = slice.actions;

export default slice.reducer;
