import { createSlice } from "@reduxjs/toolkit";
import { fetchUserSession } from "./userSessionThunk";
import { fetchUserLogin } from "../../src/features/login-logout/login/loginThunk";
import { userLogout } from "../../src/features/login-logout/logout/logoutThunk";

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState: {
    userSession: null,
    sessionLoading: false,
    sessionError: null,
    loggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🟢 Session Actions
    builder.addCase(fetchUserSession.pending, (state) => {
      state.sessionLoading = true;
      state.sessionError = null;
    });
    builder.addCase(fetchUserSession.fulfilled, (state, action) => {
      // console.log("HERE", action.payload);
      state.sessionLoading = false;
      state.sessionError = null;
      state.loggedIn = action.payload !== null;
      console.log(state.userSession);
      state.userSession = action.payload;
    });
    builder.addCase(fetchUserSession.rejected, (state, action) => {
      state.sessionLoading = false;
      state.sessionError = "Session restore failed";
      // state.sessionError = action.payload.message || "Session restore failed";
    });
    //refreshes after user login
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.userSession = action.payload;
      state.sessionLoading = false;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.loggedIn = false;
    });
  },
});

export const selectUserSession = (state) => state.userSession;

export const {} = userSessionSlice.actions;

export default userSessionSlice.reducer;
