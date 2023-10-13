import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFirstName,
  setLastName,
  setGenderName,
  setMaritalStatus,
  setDob,
  setDependents,
} from "../features/employee/employeeSlice";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setAccountName } from "../features/bank/bankSlice";

const minDate = new Date();
const maxDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 20);
maxDate.setFullYear(minDate.getFullYear() + 90);

const currentYear = new Date().getFullYear();
const minYear = currentYear - 100;
const maxYear = currentYear + 90;

const EmployeeDetailsForm = () => {
  const { firstName, lastName, gender, maritalStatus, dependents, dob } =
    useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // setGender(e.target.value);
    dispatch(setGenderName(e.target.value));
  };

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Typography variant="h6" gutterBottom>
          Personal Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => {
                dispatch(setFirstName(e.target.value));
              }}
              value={firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => {
                dispatch(setLastName(e.target.value));
                dispatch(setAccountName(firstName + " " + e.target.value));
              }}
              value={lastName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={handleChange}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              Marital Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={maritalStatus}
              label="Marital Status"
              onChange={(e) => dispatch(setMaritalStatus(e.target.value))}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
            >
              <MenuItem value={"Married"}>Married</MenuItem>
              <MenuItem value={"Single"}>Single</MenuItem>
              <MenuItem value={"Divorced"}>Divorced</MenuItem>
              <MenuItem value={"Widowed"}>Widowed</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">
              No. of Dependents
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dependents}
              label="No. of Dependents"
              onChange={(e) => dispatch(setDependents(e.target.value))}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
            >
              <MenuItem value={"0"}>0</MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"6+"}>6+</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputVariant="standard"
                disableFuture
                label="Date of Birth"
                openTo="year"
                maxDate={minDate}
                views={["year", "month", "day"]}
                value={dob ? dob : `${minDate}`}
                onChange={(newValue) => {
                  dispatch(setDob(newValue));
                }}
                //onChange={(e) => dispatch(setDob(e))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
// 23

export default EmployeeDetailsForm;
