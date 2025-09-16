import { createSlice } from "@reduxjs/toolkit";
import { fetchUserSession } from "../../../dummy  folder/sessionCheck/userSessionThunk";
import { fetchUserLogin } from "./login/loginThunk";
import { userLogout } from "./logout/logoutThunk";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    userAuthLoading: false,
    userAuthError: null,
    loggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🟢 Session Actions
    builder.addCase(fetchUserSession.pending, (state) => {
      state.userAuthLoading = true;
      state.userAuthError = null;
    });
    builder.addCase(fetchUserSession.fulfilled, (state, action) => {
      // console.log("HERE", action.payload);
      // console.log(state.userSession);
      state.userAuthLoading = false;
      state.userAuthError = null;
      state.loggedIn = action.payload !== null;
      state.user = action.payload;
    });
    builder.addCase(fetchUserSession.rejected, (state, action) => {
      state.userAuthLoading = false;
      state.userAuthError = "Session restore failed";
      // state.userAuthError = action.payload.message || "Session restore failed";
    });
    //refreshes after user login
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.userAuthLoading = true;
      state.userAuthError = null;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.userAuthLoading = false;
      state.userAuthError = null;
      state.user = action.payload;
      state.loggedIn = true;
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.userAuthLoading = false;
      state.userAuthError = action.payload.message || "Login failed";
      state.user = null;
      state.loggedIn = false;
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user = null;
      state.loggedIn = false;
    });
  },
});

export const selectUserAuth = (state) => state.userAuth;

export const {} = userAuthSlice.actions;

export default userAuthSlice.reducer;
