import { createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./accountThunk";

export const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    userOrders: [],
    userOrdersLoading: false,
    userOrdersError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🟢 orders Actions
    builder.addCase(fetchUserOrders.pending, (state, action) => {
      state.userOrdersLoading = true;
      state.userOrdersError = null;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
    //   console.log("HERE", action.payload);
      state.userOrdersLoading = false;
      state.userOrdersError = null;
      state.userOrders = action.payload;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.userOrdersLoading = false;
      state.userOrdersError = "user orders fetch failed";
    });
    //refreshes after user login
    // builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
    //   state.userSession = action.payload;
    //   state.sessionLoading = false;
    // });
  },
});

export const selectUserOrders = (state) => state.userOrders;

export const {} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
