import { createAsyncThunk } from "@reduxjs/toolkit";
const API_CATEGORIES = import.meta.VITE_API_ENDPOINT_CATEGORIES;
const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, thunkAPI) => {
  // await new Promise((res) => setTimeout(res, 2000));
  try {
    const response = await fetch(API_CATEGORIES);
    if (!response.ok) {
      const errorInfo = await response.json();
      return thunkAPI.rejectWithValue(errorInfo);
    }
    const data = await response.json();
    return data;
  } catch (error) {}
});
