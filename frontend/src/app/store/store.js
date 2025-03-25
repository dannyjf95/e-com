import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/countSlice";
import itemsReducer from "../../features/items/itemsSlice";
import categoriesReducer from "../../features/categories/categoriesSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemsReducer,
    categories: categoriesReducer,
  },
});
