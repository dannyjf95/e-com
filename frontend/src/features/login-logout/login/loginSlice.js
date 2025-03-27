import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin } from "./loginThunk";
import { fetchUserSession } from "../sessionCheck/userSessionThunk";

export const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loginLoading: false,
    loginError: null,
    // loggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🔵 Login Actions
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginError = null;
      state.user = action.payload;
      // state.loggedIn = true;
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload.message || "Login failed";
    });
  },
});

export const selectUser = (state) => state.user;

export const {} = userLoginSlice.actions;

export default userLoginSlice.reducer;
