import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddCustomerForm: false,
};

const simSlice = createSlice({
  name: "sim",
  initialState,
  reducers: {
    setIsAddCustomerForm: (state, { payload }) => {
      state.isAddCustomerForm = payload;
    },
  },
});

export const { setIsAddCustomerForm } = simSlice.actions;

export default simSlice.reducer;
