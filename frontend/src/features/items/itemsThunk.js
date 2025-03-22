import { createAsyncThunk } from "@reduxjs/toolkit";

const api = "http://localhost:5000/items/1";

export const fetchItems = createAsyncThunk("items/fetchItems", async (_, thunkAPI) => {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      const errorInfo = await response.json();
      return thunkAPI.rejectWithValue(errorInfo);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: "Something went wrong while fetching items" });
  }
});
