import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./itemsThunk";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    itemFetchLoading: false,
    itemFetchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.itemFetchLoading = true;
      state.itemFetchError = null;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.itemFetchLoading = false;
      state.itemFetchError = null;
      state.items = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.itemFetchLoading = false;
      state.itemFetchError = action.payload.error || "";
    });
  },
});

export const selectItems = (state) => state.items;

export const {} = itemsSlice.actions;

export default itemsSlice.reducer;
