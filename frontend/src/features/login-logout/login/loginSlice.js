import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin } from "./loginThunk";
import { fetchUserSession } from "../sessionCheck/userSessionThunk";

export const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loginLoading: false,
    loginError: null,
    sessionLoading: false,
    sessionError: null,
    loggedIn: false,
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
      state.loggedIn = true;
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload.message || "Login failed";
    });

    // 🟢 Session Actions
    builder.addCase(fetchUserSession.pending, (state) => {
      state.sessionLoading = true;
      state.sessionError = null;
    });
    builder.addCase(fetchUserSession.fulfilled, (state, action) => {
      state.sessionLoading = false;
      state.sessionError = null;
      state.loggedIn = action.payload.user !== null;
      state.user = action.payload.user;
    });
    builder.addCase(fetchUserSession.rejected, (state, action) => {
      state.sessionLoading = false;
      state.sessionError = action.payload.message || "Session restore failed";
    });
  },
});

export const selectUser = (state) => state.user;

export const {} = userLoginSlice.actions;

export default userLoginSlice.reducer;
