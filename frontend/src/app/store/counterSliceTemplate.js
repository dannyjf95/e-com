import { createSlice } from "@reduxjs/toolkit";
//concat create with Slice (createSlice)
export const name = createSlice({
  name: "",
  initialState: {},
  reducers: {
    method: (state, action) => {
      state;
    },
  },
});
//access state propertys with state.counter for all state || state.counter.value for individual state values
export const selectCount = (state) => state;

//concat slice name with .actions (counterSlice.actions)
export const {
  /**actions */
} = Slice.actions;

//concat slice name to Slice.reducer (counterSlice.reducer)
export default counterSlice.reducer;
