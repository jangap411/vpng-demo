import React from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setInvoice,
  setLoanAmountApplied,
  setRepaymentAmount,
  setRepaymentTerm,
  setLoanPurpose,
} from "../features/loan/loanSlice";

const LoanForm = () => {
  const dispatch = useDispatch();
  const { invoice, loanAmount, repaymentAmount, repaymentTerm, loanPurpose } =
    useSelector((state) => state.loan);

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Typography variant="h6" gutterBottom>
          Loan Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={8} sm={3}>
            <TextField
              required
              id="invoice"
              name="invoice"
              label="Invoice Number"
              fullWidth
              autoComplete="invoice-number"
              variant="standard"
              value={invoice}
              onChange={(e) => dispatch(setInvoice(e.target.value))}
            />
          </Grid>
          <Grid item xs={8} sm={3}>
            <TextField
              required
              id="loanAmount"
              name="loanAmount"
              label="Amount Applied for"
              fullWidth
              autoComplete="loan-amount"
              value={loanAmount}
              onChange={(e) => dispatch(setLoanAmountApplied(e.target.value))}
              variant="standard"
            />
          </Grid>
          <Grid item xs={8} sm={3}>
            <TextField
              required
              id="repaymentAmount"
              name="repaymentAmount"
              label="Loan Repayment Amount"
              fullWidth
              autoComplete="repayment-amount"
              variant="standard"
              value={repaymentAmount}
              onChange={(e) => dispatch(setRepaymentAmount(e.target.value))}
            />
          </Grid>
          <Grid item xs={8} sm={3}>
            <TextField
              required
              id="repaymentTerm"
              name="repaymentTerm"
              label="Loan Term (No. of Payments)"
              fullWidth
              autoComplete="loan-term"
              variant="standard"
              value={repaymentTerm}
              onChange={(e) => dispatch(setRepaymentTerm(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="loanPurpose"
              name="loanPurpose"
              label="Purpose of Loan"
              fullWidth
              autoComplete="laon-reason"
              variant="standard"
              value={loanPurpose}
              onChange={(e) => dispatch(setLoanPurpose(e.target.value))}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LoanForm;
