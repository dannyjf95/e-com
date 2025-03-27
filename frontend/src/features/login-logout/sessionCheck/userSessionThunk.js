import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchUserSession = createAsyncThunk("session/fetchSession", async () => {
  const response = await fetch("http://localhost:5000/session", {
    credentials: "include", // Important! Sends session cookie
  });
  const data = await response.json();
  return data;
});
