import React, { useState, useEffect } from "react";
import { Grid, InputLabel, TextField, Button } from "@mui/material";
import Title from "../../components/Title";
import axios from "axios";
import Page from "../../components/Page";
import { useDispatch } from "react-redux";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../../features/alert/alertSlice";
import { useParams } from "react-router-dom";

// API url
const API = "http://localhost:5500/api/v1";

const CustomerDetails = () => {
  // state
  const dispatch = useDispatch();
  const { id } = useParams();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [msisdn, setMsisdn] = useState("");

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  // load customer
  const loadUserDetails = async () => {
    try {
      const { data } = await axios.get(`${API}/customers/${id}`);
      console.log(data);
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setGender(data?.gender);
      setDob(data?.dob);
      setMsisdn(data?.msisdn);
      setAddress(data?.address);
    } catch (error) {
      openAlertMsg("error", error.message);
    }
  };

  //   update customer
  const updateCustomer = async () => {
    try {
      const customer = await axios.patch(`${`${API}/customers`}/${id}`, {
        first_name,
        last_name,
        gender,
        dob,
        address,
        msisdn,
      });

      // check update
      if (!customer) {
        openAlertMsg("error", "Error while updating.");
      }

      openAlertMsg("success", "Customer data updated.");
    } catch (error) {
      openAlertMsg("error", error.message);
    }
  };

  // delete function
  const deleteCustomer = async () => {
    try {
      const customer = await axios.delete(`${API}/customers/${id}`);

      // check customer
      if (!customer) {
        openAlertMsg("error", "Error occured while deleting user");
      }

      openAlertMsg("success", "Customer deleted.");
    } catch (error) {
      console.log("\n----------\n");
      openAlertMsg("error", error.message);
    }
  };

  //   load data
  useEffect(() => {
    loadUserDetails();
  }, []);

  return (
    <Page>
      <Title>Customer Details</Title>
      <Grid item container spacing={2} sx={{ p: 2, m: 1 }}>
        <Grid item xs={12} sm={4}>
          <InputLabel id="full-name">First Name</InputLabel>
          <TextField
            variant="standard"
            name="user-name-field"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="username">Last Name</InputLabel>
          <TextField
            variant="standard"
            name="user-name-field"
            type="text"
            value={last_name}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="email">Date of Birth</InputLabel>
          <TextField
            variant="standard"
            name="email-field"
            type="email"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="password">Gender</InputLabel>
          <TextField
            variant="standard"
            name="password-field"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="password">Address</InputLabel>
          <TextField
            variant="standard"
            name="password-field"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="password">MSISDN</InputLabel>
          <TextField
            variant="standard"
            name="password-field"
            type="text"
            value={msisdn}
            onChange={(e) => setMsisdn(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item sx={{ m: 1, p: 1, width: "90%" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#B40205",
            "&:hover": "#790102",
          }}
          sx={{
            mt: 1,
            ml: 1,
            float: "right",
          }}
          onClick={deleteCustomer}
        >
          delete
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#B40205",
            "&:hover": "#790102",
          }}
          sx={{
            mt: 1,
            ml: 1,
            float: "right",
          }}
          onClick={updateCustomer}
        >
          update
        </Button>
      </Grid>
    </Page>
  );
};

export default CustomerDetails;
