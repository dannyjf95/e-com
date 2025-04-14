import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteThunkCreator = ({ actionType = null, apiEndpoint = null, dataKey = null, params = null }) => {
  return createAsyncThunk(actionType, async (params, thunkAPI) => {
    console.log(apiEndpoint);
    try {
      const options = {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
        // body: body ? JSON.stringify(body) : null,
        credentials: "include",
      };
      const response = await fetch(`${apiEndpoint}${params.id}`, options);
      // const response = params ? await fetch(`${apiEndpoint}/${path}`, options) : await fetch(`${apiEndpoint}`, options);
      console.log(response);
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
// await new Promise((res) => setTimeout(res, 2000));
// console.log("📌 Creating thunk for:", actionType, "→", apiEndpoint);
// console.log("🚀 Dispatching thunk:", actionType, "→", apiEndpoint);
