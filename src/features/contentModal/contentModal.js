import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  isCustomerForm: false,
  isSimForm: false,
  isUserForm: false,
};

const contentModalSlice = createSlice({
  name: "contentModal",
  initialState,
  reducers: {
    setOpenModal: (state, { payload }) => {
      state.openModal = payload;
    },
    setIsCustomerForm: (state, { payload }) => {
      state.isCustomerForm = payload;
    },
    setIsSimForm: (state, { payload }) => {
      state.isSimForm = payload;
    },
    setIsUserForm: (state, { payload }) => {
      state.isUserForm = payload;
    },
  },
});

export const { setOpenModal, setIsCustomerForm, setIsSimForm, setIsUserForm } =
  contentModalSlice.actions;

export default contentModalSlice.reducer;
