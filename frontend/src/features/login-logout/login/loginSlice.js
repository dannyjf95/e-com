import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin } from "./loginThunk";
import { fetchUserSession } from "../sessionCheck/userSessionThunk";

export const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loginLoading: false,
    loginError: null,
    loggedIn: false,
    sessionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Login Actions
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loginLoading = false;
      state.loginError = null;
      state.user = action.payload;
      // state.loggedIn = true;
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload.message || "Login failed";
    });
    //fetch user session
    builder.addCase(fetchUserSession.pending, (state) => {
      state.sessionLoading = true;
      state.sessionError = null;
    });
    builder.addCase(fetchUserSession.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.sessionLoading = false;
      state.sessionError = null;
      state.loggedIn = action.payload !== null;
      state.user = action.payload;
      // state.loggedIn = true;
    });
    builder.addCase(fetchUserSession.rejected, (state, action) => {
      state.sessionLoading = false;
      state.sessionError = action.payload || "Session restore failed";
    });
  },
});

export const selectUser = (state) => state.user;

export const {} = userLoginSlice.actions;
console.log(userLoginSlice)
export default userLoginSlice.reducer;
