import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bank: "",
  branch: "",
  accountName: "",
  accountType: "",
  accountNumber: "",
  banks: [],
  branches: [],
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBank: (state, action) => {
      state.bank = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
    setAccountType: (state, action) => {
      state.accountType = action.payload;
    },
    setAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
    clearBankState: (state) => {
      state.bank = "";
      state.branch = "";
      state.accountName = "";
      state.accountType = "";
      state.accountNumber = "";
    },
  },
});

export const {
  setBanks,
  setBranches,
  setBank,
  setBranch,
  setAccountName,
  setAccountType,
  setAccountNumber,
  clearBankState,
} = bankSlice.actions;

export default bankSlice.reducer;
