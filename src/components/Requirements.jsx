import React from "react";
import { Grid, Button } from "@mui/material";

const stepper = false;

const Requirements = () => {
  return (
    <>
      <Grid item container spacing={3} xs={12}>
        <Grid item xs={12} sm={6}>
          <div style={{ padding: "1rem" }}>
            <h2>Prerequisites</h2>
            <p>
              Applicant's Employer must be registered with Customer Credit
              Scheme (CCS). Applicant must be employed for minimum of three (3)
              years with the same Organization. Employment status is PERMANENT -
              Part-Time/Causal employees are ineligible.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ padding: "1rem" }}>
            <h2>Requirements</h2>
            <p>
              Three (3) lastest payslips. Copy of Identification e.g.: Current
              Employement ID, PNG Drviers License, Passport etc. Confirmaiton of
              Employment Letter outline: Date of Employment Current Position
              Held Remuneration Value of Long Server Leave (LSL) Entitlement
              Quote From Brian Bell
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ p: 5 }}>
          <div style={{ padding: "1rem" }}>
            <h2>Customer Credit Scheme Policy</h2>
            <p>
              No Deposit Required Minimum accumulated purchase value is K300.00
              and can comprise of any items from Brian Bell Maximum purchase
              value is determined by Applicant's LSL entitlements and net pay
              Multiple qoutes are permitted subject to Applicant's eligibility
              Minimum repayment term is 13 Fortnights or 6 months Maxmimum
              repayment term is 26 Fortnights or 1 year Applicants's CSS
              deduction must not exceed 50% of net pay Total CCS purchase value
              (inlcuding term charges) must not exceed 50% of Appliacnts LSL
              entitlement First deduction must commence before items are
              collected/delivered (Cash payment in lieu of first deduction is
              not permitted) Applicant must provide evidence of first deduction
              i.e. PaySlip prior to conllection/delivery of items
            </p>
          </div>
          {stepper && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#f3754c",
                    "&:hover": "#EB3C47",
                    padding: "16px",
                  }}
                  variant="contained"
                  align="center"
                >
                  <a href="#application">Apply Now</a>
                </Button>
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Requirements;
