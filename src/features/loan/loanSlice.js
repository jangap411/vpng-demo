import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoice: "",
  loanAmount: 500.0,
  repaymentAmount: 0.0,
  repaymentTerm: 5,
  loanPurpose: "",
  interest: 0.0,
  loanDetails: false,
  totalRepayment: 0.0,
  installmentAmount: "",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setInvoice: (state, action) => {
      state.invoice = action.payload;
    },
    setLoanAmountApplied: (state, action) => {
      state.loanAmount = action.payload;
    },
    setRepaymentAmount: (state, action) => {
      state.repaymentAmount = action.payload;
    },
    setRepaymentTerm: (state, action) => {
      state.repaymentTerm = action.payload;
    },
    setLoanPurpose: (state, action) => {
      state.loanPurpose = action.payload;
    },
    setInterest: (state, action) => {
      state.interest = action.payload;
    },
    setLoanDetails: (state, action) => {
      state.loanDetails = action.payload;
    },
    setInstallments: (state, action) => {
      state.installmentAmount = action.payload;
    },
    setTotalRepaymentAmount: (state, action) => {
      state.totalRepayment = action.payload;
    },
    clearLaonState: (state) => {
      state.loanAmount = 500;
      state.repaymentAmount = 0;
      state.repaymentTerm = 5;
      state.loanPurpose = "";
      state.interest = 1.55;
      state.loanDetails = false;
      state.totalRepayment = "";
      state.installmentAmount = "";
    },
  },
});

export const {
  setInvoice,
  setLoanAmountApplied,
  setRepaymentAmount,
  setRepaymentTerm,
  setLoanPurpose,
  setInterest,
  setLoanDetails,
  setTotalRepaymentAmount,
  setInstallments,
  clearLaonState,
} = loanSlice.actions;

export default loanSlice.reducer;
