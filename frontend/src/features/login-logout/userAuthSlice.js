import { createSlice } from "@reduxjs/toolkit";
// gather current user session details(user details, cart, account ect)
import { fetchUserSession } from "../../../dummy  folder/sessionCheck/userSessionThunk";
// user login / out
import { fetchUserLogin } from "./login/loginThunk";
import { userLogout } from "./logout/logoutThunk";

//user sign up
import { fetchUserRegister } from "../register/registerThunk";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    userAuthLoading: false,
    userAuthError: null,
    userCreatedSuccess: null,
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
    //add pending/rejected? for saftey messures
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.user = null;
      state.loggedIn = false;
    });
    //register user and refresh user session
    builder.addCase(fetchUserRegister.pending, (state, action) => {
      state.userAuthLoading = true;
      state.userAuthError = null;
    });
    builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
      console.log("here,", action.payload);
      state.user = action.payload;
      state.userAuthLoading = false;
      state.userAuthError = null;
      state.userCreatedSuccess = true
    });
    builder.addCase(fetchUserRegister.rejected, (state, action) => {
      // console.log(action.payload);
      state.userAuthLoading = false;
      state.userAuthError = action.payload.error;
    });
  },
});

export const selectUserAuth = (state) => state.userAuth;

export const {} = userAuthSlice.actions;

export default userAuthSlice.reducer;
