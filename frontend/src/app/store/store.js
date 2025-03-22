import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/countSlice";
import itemsReducer from "../../features/items/itemsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemsReducer,
  },
});
