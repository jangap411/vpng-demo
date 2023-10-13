import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
};

const contentModalSlice = createSlice({
  name: "contentModal",
  initialState,
  reducers: {
    setOpenModal: (state, { payload }) => {
      state.openModal = payload;
    },
  },
});

export const { setOpenModal } = contentModalSlice.actions;

export default contentModalSlice.reducer;
