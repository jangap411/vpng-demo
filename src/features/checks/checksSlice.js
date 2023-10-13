import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSpeedDial: true,
};

const checksSlice = createSlice({
  name: "checks",
  initialState,
  reducers: {
    setShowSpeedDial: (state, action) => {
      state.showSpeedDial = action.payload;
    },
  },
});

export const { setShowSpeedDial } = checksSlice.actions;

export default checksSlice.reducer;
