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
import Page from "../../components/Page";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// api
const API = "http://localhost:5500/api/v1";

const UserDetails = () => {
  // state
  const dispatch = useDispatch();
  const { id } = useParams();
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

  // update user function
  const updateUser = async () => {
    try {
      console.log(name, username, email, password);
      const user = await axios.patch(`${API}/users/${id}`, {
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

  // delete user
  const deleteUser = async () => {
    try {
      // const check = confirm("Press a button!");

      // if (!check) {
      //   return;
      // }

      const user = await axios.delete(`${API}/users/${id}`);

      if (!user) {
        openAlertMsg("error", "Error deleting user");
      }

      openAlertMsg("success", "User deleted");
    } catch (error) {
      openAlertMsg("error", error.message);
    }
  };

  // load user data
  const loadUser = async () => {
    try {
      const { data } = await axios.get(`${API}/users/${id}`);

      console.log(data);
      setName(data?.full_name);
      setEmail(data?.email);
      setUsername(data?.username);
      setPassword(data?.password);
    } catch (error) {
      openAlertMsg("error", error.message);
    }
  };

  // load data
  useEffect(() => {
    // load user
    loadUser();
  }, []);

  return (
    <Page>
      <>
        <Title>User Details</Title>
        <Grid item container spacing={2} sx={{ p: 2, m: 1 }}>
          <Grid item xs={12} sm={6}>
            <InputLabel id="full-name">Full Name</InputLabel>
            <TextField
              variant="standard"
              name="full-name-field"
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
          <Grid item sx={{ m: 1, p: 1, width: "90%" }} xs={12} sm={8}>
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
              onClick={deleteUser}
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
              onClick={updateUser}
            >
              update
            </Button>
          </Grid>
        </Grid>
      </>
    </Page>
  );
};

export default UserDetails;
