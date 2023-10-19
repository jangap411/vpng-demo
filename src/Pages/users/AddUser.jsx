import React, { useState } from "react";
import { Grid, InputLabel, TextField, Button } from "@mui/material";
import Title from "../../components/Title";
import axios from "axios";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../../features/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";

// api
const API = "http://localhost:5500/api/v1";

const AddUser = () => {
  // state
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {} = useSelector((state) => state.alert);

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  // add user function
  const addNewUser = async () => {
    try {
      console.log(name, username, email, password);
      const user = await axios.post(`${API}/users`, {
        name,
        username,
        email,
        password,
      });
      if (!user) {
        openAlertMsg("error", "Error adding user");
      }

      openAlertMsg("success", "New user added");
    } catch (error) {
      console.error(error);
      openAlertMsg("error", error.message);
    }
  };

  return (
    // <Page>
    <>
      <Title>User Details</Title>
      <Grid item container spacing={2} sx={{ p: 2, m: 1 }}>
        <Grid item xs={12} sm={6}>
          <InputLabel id="full-name">Full Name</InputLabel>
          <TextField
            variant="standard"
            name="user-name-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="username">Username</InputLabel>
          <TextField
            variant="standard"
            name="user-name-field"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="email">Email</InputLabel>
          <TextField
            variant="standard"
            name="email-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="password">Password</InputLabel>
          <TextField
            variant="standard"
            name="password-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={addNewUser}
        >
          save
        </Button>
      </Grid>
    </>
    // </Page>
  );
};

export default AddUser;
