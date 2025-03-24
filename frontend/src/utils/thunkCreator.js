import { createAsyncThunk } from "@reduxjs/toolkit";

export const thunkCreator = ({ thunkName, type, apiEndpoint, dataKey = null, method = null, body = null }) => {
  const newThunk =  createAsyncThunk(type, async (_, thunkAPI) => {
    // await new Promise((res) => setTimeout(res, 2000));
    try {
      const response = await fetch(apiEndpoint, { method, body: body ? JSON.stringify(body) : null });

      if (!response.ok) {
        const errorInfo = await response.json();
        return thunkAPI.rejectWithValue(errorInfo);
      }
      const data = await response.json();
    //   console.log(data);
      return dataKey ? data[dataKey] : data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "Something went wrong while fetching items" });
    }
  });
  return newThunk;
};
