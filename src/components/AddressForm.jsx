import React, { useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setLot,
  setSection,
  setSuburb,
  setStreet,
  setCity,
  setProvince,
  setMobileNumber,
  setPhoneNumber,
  setPostalAddress,
  setEmail,
} from "../features/address/addressSlice";
import ResidentialType from "./ResidentialType";

const AddressForm = () => {
  const dispatch = useDispatch();

  const { mobileNumber, phoneNumber, email, postalAddress } = useSelector(
    (state) => state.address
  );

  // const NUMBER_REGEX = /\b([0-9]|10)\b /;
  const NUMBER_REGEX = /^\d+$/;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const [mobileNumError, setMobileNumError] = useState(false);
  const [phoneNumError, setPhoneNumError] = useState(false);
  const handleKeyPressMobileNumber = (event) => {
    const newNumber = event.target.value.replace(/\D/g, "");
    setMobileNumError(!NUMBER_REGEX.test(event.target.value));
    dispatch(setMobileNumber(newNumber));
  };

  const handleKeyPressPhoneNumber = (event) => {
    const newNumber = event.target.value.replace(/\D/g, "");
    dispatch(setPhoneNumber(newNumber));
    setPhoneNumError(!NUMBER_REGEX.test(event.target.value));
  };

  const [error, setError] = useState(false);
  const handleKeyPressEmail = (event) => {
    // const newNumber = event.target.value.replace(/\D/g, "");
    setError(!EMAIL_REGEX.test(event.target.value));
    if (!setError) {
      return dispatch(setEmail(null));
    }
    dispatch(setEmail(event.target.value));
  };

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Typography variant="h6" gutterBottom>
          Residential & Contact Details
        </Typography>
        <Grid container spacing={3}>
          {/* render residential type */}
          <ResidentialType />
          {/* header text */}
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h5"
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            >
              Contact Details
            </Typography>
          </Grid>
          {/* fixed fields */}
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              fullWidth
              autoComplete="mobile-number"
              variant="standard"
              value={mobileNumber}
              onChange={handleKeyPressMobileNumber}
              helperText={
                mobileNumError ? "Please enter a valid phone number" : ""
              }
              inputProps={{ maxLength: 8 }}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              autoComplete="mobile-number"
              variant="standard"
              value={phoneNumber}
              onChange={handleKeyPressPhoneNumber}
              helperText={
                phoneNumError ? "Please enter a valid phone number" : ""
              }
              inputProps={{ maxLength: 8 }}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="email"
              name="email"
              label="Email Address"
              fullWidth
              autoComplete="email-address"
              variant="standard"
              value={email}
              onChange={handleKeyPressEmail}
              type="email"
              helperText={error ? "Please enter a valid email address" : ""}
            />
          </Grid>
          {/* header text */}
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h5"
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            >
              Postal Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="postalAddress"
              name="postalAddress"
              label="Postal Address"
              fullWidth
              autoComplete="postal-address"
              variant="standard"
              value={postalAddress}
              onChange={(e) => dispatch(setPostalAddress(e.target.value))}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddressForm;
