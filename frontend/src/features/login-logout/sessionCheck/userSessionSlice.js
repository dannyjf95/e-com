import { createSlice } from "@reduxjs/toolkit";

import { fetchUserSession } from "../sessionCheck/userSessionThunk";

export const userSessionSlice = createSlice({
  name: "session",
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
      console.log('HERE', action.payload);
      state.sessionLoading = false;
      state.sessionError = null;
      state.loggedIn = action.payload !== null;
      state.userSession = action.payload;
    });
    builder.addCase(fetchUserSession.rejected, (state, action) => {
      state.sessionLoading = false;
      state.sessionError = action.payload.message || "Session restore failed";
    });
  },
});

export const selectUserSession = (state) => state.session;

export const {} = userSessionSlice.actions;

export default userSessionSlice.reducer;
