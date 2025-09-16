import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "../../features/items/itemsSlice";
import categoriesReducer from "../../features/categories/categoriesSlice";
import cartReducer from "../../features/cart/cartSlice";
import loginReducer from "../../../dummy  folder/loginSlice";
import userSessionReducer from "../../../dummy  folder/sessionCheck/userSessionSlice";
import userOrdersReducer from "../../features/account/account-orders/ordersSlice";
import userOrderReducer from "../../features/account/account-orders/order/orderSlice";

//

import userAuthReducer from "../../features/login-logout/userAuthSlice";

export const store = configureStore({
  reducer: {
    // ITEMS
    items: itemsReducer,
    // CATEGORIES
    categories: categoriesReducer,
    // CART
    cart: cartReducer,
    // USER
    userAuth: userAuthReducer,
    //
    // user: loginReducer, //
    // userSession: userSessionReducer, //
    // ORDERS
    userOrders: userOrdersReducer,
    userOrder: userOrderReducer,
  },
});
