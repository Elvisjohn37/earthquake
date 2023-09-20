import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDetailsLoading: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    startLoad: (state) => {
      state.isDetailsLoading = true
    },
    endLoad: (state) => {
      state.isDetailsLoading = false;
    },
  },
});

const provideData = (state) => state.map;

export const { startLoad, endLoad } = mapSlice.actions;

export default mapSlice.reducer;

export { provideData };
