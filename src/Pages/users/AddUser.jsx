import React from "react";
import Page from "../../components/Page";
import { Grid, InputLabel, TextField } from "@mui/material";

const AddUser = () => {
  return (
    <Page>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel id="full-name">Full Name</InputLabel>
          <TextField variant="standard" name="user-name-field" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="username">Username</InputLabel>
          <TextField variant="standard" name="user-name-field" type="text" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="email">Email</InputLabel>
          <TextField variant="standard" name="email-field" type="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="password">Password</InputLabel>
          <TextField variant="standard" name="password-field" type="password" />
        </Grid>
      </Grid>
    </Page>
  );
};

export default AddUser;
