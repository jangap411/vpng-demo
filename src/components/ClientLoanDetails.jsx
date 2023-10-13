import { Grid, Paper, Typography, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import CloseBtn from "./CloseBtn";
//state
import { setIsLoading } from "../features/client/clientSlice";
import {
  setOpenAlert,
  setSeverity,
  setMessage,
} from "../features/alert/alertSlice";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosHeaderConfig";

// get user from localstorage
const { name, u } = localStorage.getItem("p")
  ? JSON.parse(localStorage.getItem("p"))
  : "";
// client loan details component
const ClientLoanDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // split location to get the client id
  const id = location.pathname.split("/");

  // store loan details
  const [loanDetails, setLoanDetails] = useState([]);

  //api call
  const getClientLoanDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/clients/${id[4]}/applications`
      );

      dispatch(setIsLoading(false));
      const { application } = data;
      setLoanDetails(application);
    } catch (error) {
      dispatch(setIsLoading(false));
      dispatch(setSeverity("error"));
      dispatch(setMessage(error.message));
      dispatch(setOpenAlert(true));
    }
  };

  useEffect(() => {
    getClientLoanDetails();
  }, []);

  // debugger;

  const fixDate = (dbDate) => {
    return dbDate.substring(0, 10);
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid sx={{ mb: 2, pb: 1 }}>{/* <ClientInfo /> */}</Grid>

        <CloseBtn />
        <Paper sx={{ p: 2 }}>
          <Grid item container direction="column">
            <Typography
              component="h2"
              variant="subtitle1"
              gutterBottom
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              Loan Details
            </Typography>
            <Grid container item xs={12}>
              <Grid item xs={6} style={{ color: "#6d6d6dda" }}>
                <Typography gutterBottom>Lodge Date</Typography>
                <Typography gutterBottom>Loan Amount</Typography>
                <Typography gutterBottom>Total Repayment Amount</Typography>
                <Typography gutterBottom>Installments</Typography>
                <Typography gutterBottom>Repayment Term</Typography>
                <Typography gutterBottom>Sales Rep</Typography>
                <Typography gutterBottom>Application Type</Typography>
                <Typography gutterBottom>Rate</Typography>
                <Typography gutterBottom>Status</Typography>
                <Typography gutterBottom>Purpose</Typography>
                <Typography gutterBottom>Comments</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography gutterBottom>
                    {loanDetails?.dateLodged}
                  </Typography>
                  <Typography gutterBottom>
                    {`PGK ${loanDetails?.amountApplied}`}
                  </Typography>
                  <Typography gutterBottom>
                    {`PGK ${loanDetails?.repaymentAmount}`}
                  </Typography>
                  <Typography gutterBottom>
                    PGK {loanDetails?.installmentAmount}
                  </Typography>
                  <Typography gutterBottom>
                    {loanDetails?.term} Fortnight(s)
                  </Typography>
                  <Typography gutterBottom>
                    {loanDetails?.user?.userName
                      ? loanDetails?.user?.userName
                      : "--"}
                  </Typography>
                  <Typography gutterBottom>
                    {loanDetails?.application_type?.type
                      ? loanDetails?.application_type?.type
                      : "--"}
                  </Typography>{" "}
                  <Typography gutterBottom>
                    {loanDetails?.application_type?.rate
                      ? loanDetails?.application_type?.rate
                      : "--"}
                    %
                  </Typography>
                  <Chip
                    size="small"
                    variant="outlined"
                    label={
                      loanDetails?.application_status_Id === 1
                        ? "Pending"
                        : loanDetails?.application_status_Id === 2
                        ? "Approved"
                        : loanDetails?.application_status_Id === 3
                        ? "Declined"
                        : loanDetails?.application_status_Id === 4
                        ? "Cancel"
                        : loanDetails?.application_status_Id === 5
                        ? "Accepted"
                        : loanDetails?.application_status_Id === 6
                        ? "Rejected"
                        : null
                    }
                    title={`Status: ${
                      loanDetails?.application_status_Id === 1
                        ? "pending"
                        : loanDetails?.application_status_Id === 2
                        ? "approved"
                        : loanDetails?.application_status_Id === 3
                        ? "declined"
                        : loanDetails?.application_status_Id === 4
                        ? "cancel"
                        : loanDetails?.application_status_Id === 5
                        ? "Accepted"
                        : loanDetails?.application_status_Id === 6
                        ? "Rejected"
                        : null
                    }`}
                    sx={{ p: 0, m: 0 }}
                  />
                  <Typography gutterBottom>{loanDetails?.purpose}</Typography>
                  <Typography gutterBottom>{loanDetails?.comments}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default ClientLoanDetails;
