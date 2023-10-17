import React from "react";
import Page from "../../components/Page";
import { Grid, TextField } from "@mui/material";

const AddUser = () => {
  return (
    <Page>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          full name
          <TextField variant="standard" name="user-name-field" />
        </Grid>
        <Grid item xs={12} sm={6}>
          username
          <TextField variant="standard" name="user-name-field" />
        </Grid>
        <Grid item xs={12} sm={6}>
          email
          <TextField variant="standard" name="user-name-field" />
        </Grid>
        <Grid item xs={12} sm={6}>
          password
          <TextField variant="standard" name="user-name-field" />
        </Grid>
      </Grid>
    </Page>
  );
};

export default AddUser;
