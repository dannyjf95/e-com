import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkCreator = ({
  actionType = null,
  apiEndpoint = null,
  dataKey = null,
  method = null,
  headers = null,
  body = null,
}) => {
  return createAsyncThunk(actionType, async (_, thunkAPI) => {
    // await new Promise((res) => setTimeout(res, 2000));
    // console.log("📌 Creating thunk for:", actionType, "→", apiEndpoint);
    // console.log("🚀 Dispatching thunk:", actionType, "→", apiEndpoint);
    try {
      const response = await fetch(apiEndpoint, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
      });

      if (!response.ok) {
        const errorInfo = await response.json();
        console.error("❌ Fetch failed:", apiEndpoint, errorInfo);
        return thunkAPI.rejectWithValue(errorInfo);
      }

      const data = await response.json();

      // console.log("✅ Fetch success:", apiEndpoint, data);
      return dataKey ? data[dataKey] : data;
    } catch (error) {
      console.error("❌ API Error:", apiEndpoint, error);
      return thunkAPI.rejectWithValue({ error: "Something went wrong while fetching" });
    }
  });
};
