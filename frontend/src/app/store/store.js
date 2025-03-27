import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/countSlice";
import itemsReducer from "../../features/items/itemsSlice";
import categoriesReducer from "../../features/categories/categoriesSlice";
import cartReducer from "../../features/cart/cartSlice";
import loginReducer from "../../features/login-logout/login/loginSlice";

import userSessionReducer from "../../features/login-logout/sessionCheck/userSessionSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    user: loginReducer,
    userSession: userSessionReducer,
  },
});
