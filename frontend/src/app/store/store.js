import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "../../features/items/itemsSlice";
import categoriesReducer from "../../features/categories/categoriesSlice";
import cartReducer from "../../features/cart/cartSlice";
import loginReducer from "../../features/login-logout/login/loginSlice";
import userSessionReducer from "../../features/login-logout/sessionCheck/userSessionSlice";
import userOrdersReducer from "../../features/account/account-orders/ordersSlice";
import userOrderReducer from "../../features/account/account-orders/order/orderSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    user: loginReducer,
    userSession: userSessionReducer,
    userOrders: userOrdersReducer,
    userOrder: userOrderReducer,
  },
});
