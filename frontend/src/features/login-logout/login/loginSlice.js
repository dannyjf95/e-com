import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin } from "./loginThunk";

export const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userFetchLoading: false,
    userFetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.userFetchLoading = true;
      state.userFetchError = null;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.userFetchLoading = false;
      state.userFetchError = null;
      state.user = action.payload;
    });
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.userFetchLoading = false;
      state.userFetchError = action.payload.message || "";
    });
  },
});
export const selectUser = (state) => state.user;
export const {} = userLoginSlice.actions;

export default userLoginSlice.reducer;
