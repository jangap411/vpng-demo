import React, { useState } from "react";
import {
  setFirstName,
  setLastName,
  setEmail,
  setRole,
  setPassword,
  setBranch,
  setErrorMessage,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  TextField,
  Box,
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
} from "@mui/material";
import Title from "./Title";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, role, branch } = useSelector(
    (store) => store.user
  );

  const [localPass, setLocalPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      role: data.get("role"),
    });
  };

  const handleSetBranch = (event) => {
    dispatch(setBranch(event.target.value));
  };

  const handSetRole = (event) => {
    console.log(event.target.value);
    dispatch(setRole(event.target.value));
  };

  const handleCheckPasswords = () => {
    if (localPass === confirmPass) {
      console.log("passwords match");
    } else {
      console.log("passwords do not match");
    }
  };

  return (
    <>
      {/*  md={4} lg={3} */}
      <Grid item xs={12}>
        {/* <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        > */}
        {/* Form */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Title>Add New User</Title>
            {/* <form> */}
            {/* TODO! */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                {/* <FormControl fullWidth> */}
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  variant="standard"
                  onChange={(e) => dispatch(setFirstName(e.target.value))}
                />
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <FormControl fullWidth> */}
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  variant="standard"
                  onChange={(e) => dispatch(setFirstName(e.target.value))}
                />
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <FormControl> */}
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(e) => dispatch(setLastName(e.target.value))}
                />
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={4} style={{ padding: "8px 0px 0px 15px" }}>
                {/* <FormControl> */}
                <InputLabel id="role">Select Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={role}
                  label="role"
                  onChange={handSetRole}
                  variant="standard"
                  sx={{ minWidth: 120 }}
                  style={{
                    padding: "0px",
                    margin: "0px",
                    paddingBottom: "1px",
                  }}
                >
                  <MenuItem value={"1"}>Admin</MenuItem>
                  <MenuItem value={"2"}>Sales Rep</MenuItem>
                  <MenuItem value={"3"}>Staff Rep</MenuItem>
                </Select>
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={8}>
                {/* <FormControl> */}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={4} style={{ padding: "8px 0px 0px 15px" }}>
                {/* <FormControl> */}
                <InputLabel id="branch">Branch</InputLabel>
                <Select
                  labelId="branch"
                  id="branch"
                  value={branch}
                  label="branch"
                  onChange={handleSetBranch}
                  variant="standard"
                  sx={{ minWidth: 120 }}
                  style={{
                    padding: "0px",
                    margin: "0px",
                    paddingBottom: "1px",
                  }}
                >
                  <MenuItem value={"1"}>Port Moresby</MenuItem>
                  <MenuItem value={"2"}>Lae</MenuItem>
                  <MenuItem value={"3"}>Goroka</MenuItem>
                  <MenuItem value={"4"}>Madang</MenuItem>
                  <MenuItem value={"5"}>Kokopo</MenuItem>
                  <MenuItem value={"6"}>Kimbe</MenuItem>
                  <MenuItem value={"7"}>Mt. Hagen</MenuItem>
                </Select>
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <FormControl> */}
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  onChange={(e) => setLocalPass(e.target.value)}
                />
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <FormControl> */}
                <TextField
                  required
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="ConfirmPassword"
                  autoComplete="confirm-password"
                  variant="standard"
                  onChange={handleCheckPasswords}
                />
                {/* </FormControl> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="hover"
                style={{ backgroundColor: "#EB3C47" }}
                onSubmit={handleSubmit}
              >
                Add User
              </Button>
            </Grid>
            {/* </form> */}
          </Box>
        </Box>
        {/* </Paper> */}
      </Grid>
    </>
  );
};

export default AddUserForm;
