import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkCreator = ({ actionType, apiEndpoint, dataKey = null, method = "GET", body = null }) => {
  return createAsyncThunk(actionType, async (_, thunkAPI) => {
    // console.log("📌 Creating thunk for:", actionType, "→", apiEndpoint);
    // console.log("🚀 Dispatching thunk:", actionType, "→", apiEndpoint);
    try {
      const response = await fetch(apiEndpoint, { method, body: body ? JSON.stringify(body) : null });

      if (!response.ok) {
        const errorInfo = await response.json();
        console.error("❌ Fetch failed:", apiEndpoint, errorInfo);
        return thunkAPI.rejectWithValue(errorInfo);
      }

      const data = await response.json();

      console.log("✅ Fetch success:", apiEndpoint, data);
      return dataKey ? data[dataKey] : data;
    } catch (error) {
      console.error("❌ API Error:", apiEndpoint, error);
      return thunkAPI.rejectWithValue({ error: "Something went wrong while fetching" });
    }
  });
};
