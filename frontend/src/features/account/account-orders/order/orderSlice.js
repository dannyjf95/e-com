import { createSlice } from "@reduxjs/toolkit";
import { fetchUserOrder } from "./orderThunk";

export const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    userOrder: [],
    userOrderLoading: false,
    userOrderError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🟢 orders Actions
    builder.addCase(fetchUserOrder.pending, (state, action) => {
      state.userOrderLoading = true;
      state.userOrderError = null;
    });
    builder.addCase(fetchUserOrder.fulfilled, (state, action) => {
      console.log("HERE", action.payload);
      state.userOrderLoading = false;
      state.userOrderError = null;
      state.userOrder = action.payload;
    });
    builder.addCase(fetchUserOrder.rejected, (state, action) => {
      state.userOrderLoading = false;
      state.userOrderError = "user orders fetch failed";
    });
    //refreshes after user login
    // builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
    //   state.userSession = action.payload;
    //   state.sessionLoading = false;
    // });
  },
});

export const selectUserOrder = (state) => state.userOrder;

export const {} = userOrderSlice.actions;

export default userOrderSlice.reducer;
