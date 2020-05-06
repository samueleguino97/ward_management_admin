import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mainReducer from "./reducers";

const store = configureStore({
  reducer: mainReducer,
});
export default store;
