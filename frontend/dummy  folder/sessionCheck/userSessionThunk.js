import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUserSession = createAsyncThunk("userSession/fetchUserSession", async () => {
  const response = await fetch("http://localhost:5000/session", {
    credentials: "include", // Important! Sends session cookie
  });
  const data = await response.json();
  // console.log(data)
  return data.user;
});
