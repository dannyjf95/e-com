import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/countSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
