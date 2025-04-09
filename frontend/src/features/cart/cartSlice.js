import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, deleteFromCart } from "./cartThunk";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
    cartFetchLoading: false,
    cartFetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.cartFetchLoading = true;
      state.cartFetchError = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cartFetchLoading = false;
      state.cartFetchError = null;
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.cartFetchLoading = false;
      state.cartFetchError = action.payload || "";
    });
    builder.addCase(deleteFromCart.pending, (state) => {
      state.cartFetchLoading = true;
      state.cartFetchError = null;
    });
    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      console.log(action.payload);
      state.cartFetchLoading = false;
      state.cartFetchError = null;
      state.cart = action.payload;
    });
    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.cartFetchLoading = false;
      state.cartFetchError = action.payload || "";
    });
  },
});
export const selectCart = (state) => state.cart;
export const {} = cartSlice.actions;

export default cartSlice.reducer;
