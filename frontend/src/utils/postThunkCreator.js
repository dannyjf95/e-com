import { createAsyncThunk } from "@reduxjs/toolkit";

export const postThunkCreator = ({ actionType = null, apiEndpoint = null, dataKey = null, params = null }) => {
  return createAsyncThunk(actionType, async (body, thunkAPI) => {
    console.log(body);
    try {
      const path = params ? Object.values(params).join("/") : "";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
      };

      const response = params ? await fetch(`${apiEndpoint}/${path}`, options) : await fetch(`${apiEndpoint}`, options);

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
// await new Promise((res) => setTimeout(res, 2000));
// console.log("📌 Creating thunk for:", actionType, "→", apiEndpoint);
// console.log("🚀 Dispatching thunk:", actionType, "→", apiEndpoint);
