import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openBar: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setOpenBar: (state, action) => {
      state.openBar = action.payload;
    },
  },
});

export const { setOpenBar } = notificationSlice.actions;

export default notificationSlice.reducer;
