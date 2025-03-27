import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin } from "./loginThunk";
import { fetchUserSession } from "../sessionCheck/userSessionThunk";

export const userSessionSlice = createSlice({
  name: "session",
  initialState: {
    user: null,
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
      console.log(action.payload);
      state.sessionLoading = false;
      state.sessionError = null;
      state.loggedIn = action.payload !== null;
      state.user = action.payload;
    });
    builder.addCase(fetchUserSession.rejected, (state, action) => {
      state.sessionLoading = false;
      state.sessionError = action.payload.message || "Session restore failed";
    });
  },
});

export const selectUser = (state) => state.user;

export const {} = userSessionSlice.actions;

export default userSessionSlice.reducer;
