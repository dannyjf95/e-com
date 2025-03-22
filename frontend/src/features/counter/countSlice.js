import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state, action) => {
      state.value += 1;
    },
  },
});
//state
export const selectCount = (state) => state.counter.value;

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
