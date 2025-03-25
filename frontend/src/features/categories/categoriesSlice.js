import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunk";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoriesFetchLoading: false,
    categoriesFetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesFetchLoading = true;
      state.categoriesFetchError = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesFetchLoading = false;
      state.categoriesFetchError = null;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categoriesFetchLoading = false;
      state.categoriesFetchError = action.payload.categories || "";
    });
  },
});
export const selectCategories = (state) => state.categories;

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
