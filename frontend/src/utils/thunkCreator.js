import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkCreator = ({
  actionType = null,
  apiEndpoint = null,
  dataKey = null,
  method = null,
  headers = null,
  body = null,
  params = null,
}) => {
  return createAsyncThunk(actionType, async (paramNames = params, thunkAPI) => {
    // await new Promise((res) => setTimeout(res, 2000));
    // console.log("📌 Creating thunk for:", actionType, "→", apiEndpoint);
    // console.log("🚀 Dispatching thunk:", actionType, "→", apiEndpoint);
    console.log(paramNames);
    try {
      const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
      };

      let response;
      params
        ? (response = await fetch(`${apiEndpoint}/${params}`, options))
        : (response = await fetch(`${apiEndpoint}`, options));
     
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
