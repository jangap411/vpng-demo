import React from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setInvoice, setLoanPurpose } from "../features/loan/loanSlice";
import LoanSlider from "./LoanSlider";
import { useDropzone } from "react-dropzone";
import { setDocument } from "../features/employer/employerSlice";
import Uploader from "./Uploader";

const DrapAndDrop = () => {
  const dispatch = useDispatch();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  console.log("useDropzone");
  console.log(useDropzone());

  const { document } = useSelector((state) => state.employer);

  console.log("acceptedFiles");
  console.log(acceptedFiles[0]);
  console.log("getRootProps");
  console.log(getRootProps);
  console.log("getInputProps");
  console.log(getInputProps);
  dispatch(setDocument(acceptedFiles[0]));
  console.log("--- document ---");
  console.log(document);
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="drop-container">
      <aside style={{ padding: "12px" }}>
        <h4>Files</h4>
        <ul style={{ padding: "12px" }}>{files}</ul>
      </aside>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} accept="application/gzip, .zip" />
        <p>Drag and drop file here, or click to select file**</p>
      </div>
    </section>
  );
};

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
          <Grid item container xs={12}>
            <Grid item xs={8} sm={6}>
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
          </Grid>

          {/* slider for loan and repayment */}
          <LoanSlider />
          <Grid item container xs={12}>
            <Grid item>
              <Typography>
                Please Upload a zip folder containing the following information:
              </Typography>
              <div style={{ padding: "12px" }}>
                <ol>
                  <li>
                    <Typography gutterBottom>
                      Three (3) latest payslips
                    </Typography>
                  </li>
                  <li>
                    <Typography gutterBottom>
                      Copy of valid identification. Example a P.N.G drivers
                      License, Passport, etc
                    </Typography>
                  </li>
                  <li>
                    <Typography gutterBottom>
                      Confirmaiton of Employment Letter outline: Date of
                      Employment Current Position Held Remuneration Value of
                      Long Server Leave (LSL) Entitlement Quote From Brian Bell
                    </Typography>
                  </li>
                </ol>
              </div>
            </Grid>

            <Grid xs={12} item>
              {/* <DrapAndDrop /> */}
              <Uploader />
            </Grid>
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
