import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isAddParnter: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setIsAddPartner: (state, action) => {
      state.isAddParnter = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleModal, setIsAddPartner } =
  modalSlice.actions;

export default modalSlice.reducer;
