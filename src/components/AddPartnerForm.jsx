import React from "react";
import { Grid, TextField, Box, Button, Input } from "@mui/material";
import Title from "./Title";
import axios from "axios";
import Cookies from "js-cookie";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  setPartnerName,
  setPartnerLogo,
} from "../features/partners/partnerSlice";
import {
  setOpenAlert,
  setSeverity,
  setMessage,
} from "../features/alert/alertSlice";
import { closeModal } from "../features/modal/modalSlice";

//global variables
const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const API = process.env.REACT_APP_API_PROD_URL;

const AddPartnerForm = () => {
  // global state
  const dispatch = useDispatch();
  const { partnerName, partnerLogo, partnerContact, partnerAddress } =
    useSelector((store) => store.partners);

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createPartner(); // function call to api
    console.log("form submit");
  };

  //api request
  const createPartner = async () => {
    try {
      const partner = {
        name: partnerName,
        logo: partnerLogo,
      };

      const newPartner = await axios.post(`${API}/partners/new`, partner, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(newPartner);

      dispatch(setSeverity("success"));
      dispatch(setMessage(newPartner.data));
      dispatch(setOpenAlert(true));
      dispatch(closeModal());
    } catch (error) {
      console.log("--- error ---");
      console.error(error);
      dispatch(setSeverity("error"));
      dispatch(setMessage(error.message));
      dispatch(setOpenAlert(true));
      dispatch(closeModal());
    }
  };

  //update partner detail

  const currentVal = {};

  const editPartnerDetails = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component={"form"} sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Title>Add New Partner</Title>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="partner"
                  name="partner"
                  required
                  fullWidth
                  id="partner"
                  autoFocus
                  variant="standard"
                  label="Company Name"
                  value={partnerName}
                  onChange={(e) => dispatch(setPartnerName(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="company-addresss"
                  name="company-addresss"
                  label="Enter Addresss or Office location"
                  required
                  fullWidth
                  id="company-addresss"
                  type="company-addresss"
                  autoFocus
                  variant="standard"
                  value={partnerLogo}
                  onChange={(e) => dispatch(setPartnerLogo(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="company-addresss"
                  name="company-addresss"
                  label="Enter Contact Details"
                  required
                  fullWidth
                  id="company-addresss"
                  type="company-addresss"
                  autoFocus
                  variant="standard"
                  value={partnerLogo}
                  onChange={(e) => dispatch(setPartnerLogo(e.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  type={"file"}
                  autoComplete="company-logo"
                  name="company-logo"
                  label="Enter Logo"
                  required
                  fullWidth
                  id="company-logo"
                  autoFocus
                  variant="standard"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="hover"
                style={{ backgroundColor: "#EB3C47" }}
              >
                Create Partner
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default AddPartnerForm;
