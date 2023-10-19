import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddCustomerForm: false,
  customer_idcustomer: null,
};

const simSlice = createSlice({
  name: "sim",
  initialState,
  reducers: {
    setIsAddCustomerForm: (state, { payload }) => {
      state.isAddCustomerForm = payload;
    },
    setCustomerId: (state, { payload }) => {
      state.customer_idcustomer = payload;
    },
  },
});

export const { setIsAddCustomerForm, setCustomerId } = simSlice.actions;

export default simSlice.reducer;
