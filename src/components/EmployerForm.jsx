import React, { useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmployer,
  setEmploymentDate,
  setPosition,
  setDepartment,
  setWorkPhoneNumber,
  setWorkMobileNumber,
  setWorkEmail,
  setStaffId,
  setEmployerAddress,
  setPayOfficer,
  setDocument,
} from "../features/employer/employerSlice";
import { setPhoneNumber } from "../features/address/addressSlice";
import AutocompleteDealers from "./AutocompleteDealers";

const NUMBER_REGEX = /^\d+$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const EmployerForm = () => {
  const {
    employer,
    employmentDate,
    position,
    department,
    workPhoneNumber,
    workMobileNumber,
    workEmail,
    staffId,
    employerAddress,
    payOfficer,
  } = useSelector((state) => state.employer);
  const dispatch = useDispatch();

  const [dob, setDob] = useState(dayjs(Date.now()));
  const [gender, setGender] = useState("");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const [workPhoneNumberError, setWorkPhoneNumberError] = useState(false);
  const handleChangeWorkPhoneNumber = (e) => {
    const newNumber = e.target.value.replace(/\D/g, "");
    setWorkPhoneNumberError(!NUMBER_REGEX.test(e.target.value));

    dispatch(setWorkPhoneNumber(newNumber));
  };

  const [workMobileNumberError, setWorkMobileNumberError] = useState(false);
  const handleChangeWorkMobileNumber = (e) => {
    const newNumber = e.target.value.replace(/\D/g, "");
    dispatch(setWorkMobileNumber(newNumber));
    setWorkMobileNumberError(!NUMBER_REGEX.test(e.target.value));
  };

  const [workEmailError, setWorkEmailError] = useState(false);
  const handleChangeWorkEmail = (e) => {
    setWorkEmailError(!EMAIL_REGEX.test(e.target.value));
    dispatch(setWorkEmail(e.target.value));

    if (!workEmailError) {
      dispatch(setWorkEmail(null));
    }
    console.log(
      `workEmailError--------------${workEmailError}-----------------`
    );
  };

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Typography variant="h6" gutterBottom>
          Employer Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              required
              id="employer"
              name="employer"
              label="Employer"
              fullWidth
              autoComplete="employer-name"
              variant="standard"
              value={employer}
              onChange={(e) => {
                dispatch(setEmployer(e.target.value));
              }}
            /> */}
            <AutocompleteDealers />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputVariant="standard"
                disableFuture
                label="Date of Employement"
                openTo="year"
                views={["year", "month", "day"]}
                value={employmentDate}
                onChange={(newValue) => {
                  dispatch(setEmploymentDate(newValue));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="position"
              name="position"
              label="Position/Title"
              fullWidth
              autoComplete="position-name"
              variant="standard"
              value={position}
              onChange={(e) => dispatch(setPosition(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="department"
              name="department"
              label="Department"
              fullWidth
              autoComplete="department-name"
              variant="standard"
              value={department}
              onChange={(e) => dispatch(setDepartment(e.target.value))}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="workPhoneNumber"
              name="workPhoneNumber"
              label="Office Phone Number"
              fullWidth
              autoComplete="office-phone"
              variant="standard"
              value={workPhoneNumber}
              onChange={handleChangeWorkPhoneNumber}
              helperText={
                workPhoneNumberError ? "Please enter phone numbers only" : ""
              }
              inputProps={{ maxLength: 8 }}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="workMobileNumber"
              name="workMobileNumber"
              label="Office Mobile Number"
              fullWidth
              autoComplete="office-mobile"
              variant="standard"
              value={workMobileNumber}
              onChange={handleChangeWorkMobileNumber}
              helperText={
                workMobileNumberError ? "Please enter mobile numbers only" : ""
              }
              inputProps={{ maxLength: 8 }}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="workEmail"
              name="workEmail"
              label="Email Address"
              fullWidth
              autoComplete="email-address"
              variant="standard"
              value={workEmail}
              onChange={handleChangeWorkEmail}
              helperText={
                workEmailError ? "Please enter a valid email address" : ""
              }
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="staffId"
              name="staffId"
              label="Staff ID/Payroll Number"
              fullWidth
              autoComplete="staff-id"
              variant="standard"
              value={staffId}
              onChange={(e) => dispatch(setStaffId(e.target.value))}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="payOfficer"
              name="payOfficer"
              label="Name of Paymaster"
              fullWidth
              autoComplete="paymaster-name"
              variant="standard"
              value={payOfficer}
              onChange={(e) => dispatch(setPayOfficer(e.target.value))}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            {/* <Button variant="contained" component="label">
            Upload File
          </Button> */}
            {/* <label htmlFor="myfile">Upload Documents</label> */}
            {/* <input type="file" id="myFile" onChange={handleFileUpload} /> */}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Employer Address"
              fullWidth
              autoComplete="employer-address"
              variant="standard"
              value={employerAddress}
              onChange={(e) => dispatch(setEmployerAddress(e.target.value))}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EmployerForm;
