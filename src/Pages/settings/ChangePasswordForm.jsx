import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../../features/alert/alertSlice";
import CONFIG from "../../utils/axiosHeaderConfig";

const API = process.env.REACT_APP_API_PROD_URL;

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  //  ----- state -----
  // global
  const { userInfo } = useSelector((state) => state.auth);
  // local
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");

  // payload
  const payload = {
    id: userInfo?.I,
    password: currentPassword,
    newPassword: password,
  };

  // change password
  const handleSubmit = async () => {
    try {
      // check the two password
      console.log(`confirm password :${confirmPassword}`);
      console.log(`password :${password}`);

      if (!confirmPassword || !password || !currentPassword) {
        handleOpenAlert(
          "error",
          "Please make sure you fill in all the required fields."
        );
      }
      if (confirmPassword === password) {
        const { data } = await axios.post(
          `${API}/users/profile/password`,
          payload,
          CONFIG
        );
        handleOpenAlert(data.status, data.data);
      } else {
        handleOpenAlert(
          "error",
          "The password you provided does not match. Please check and try again"
        );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        handleOpenAlert(error.response.data.status, error.response.data.data);
      }
    }
  };

  const handleOpenAlert = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
  };

  return (
    <>
      <h2>Change your password here</h2>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            autoComplete="off"
            name="current-password"
            required
            fullWidth
            id="current-password"
            autoFocus
            variant="standard"
            label="Enter your current password"
            onChange={(e) => setcurrentPassword(e.target.value)}
            value={currentPassword}
            type="password"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            autoComplete="off"
            name="new-password"
            required
            fullWidth
            id="new-password"
            autoFocus
            variant="standard"
            label="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            autoComplete="off"
            name="confirm-new-password"
            required
            fullWidth
            id="confirm-new-password"
            autoFocus
            variant="standard"
            label="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="hover"
            style={{ backgroundColor: "#EB3C47" }}
            id="submit-btn"
            onClick={handleSubmit}
          >
            save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangePasswordForm;
