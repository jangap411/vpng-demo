import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonIcon from "@mui/icons-material/Person";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Progress from "../../components/Progress";
import Cookies from "js-cookie";
//state
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../features/modal/modalSlice";
import { setIsLoading, setUser } from "../../features/user/userSlice";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../../features/alert/alertSlice";
import ChangePasswordForm from "./ChangePasswordForm";
import Title from "../../components/Title";
import CloseBtn from "../../components/CloseBtn";
import LockResetIcon from "@mui/icons-material/LockReset";
import Editable from "../../components/Editable";
import SettingModal from "../../components/SettingModal";
import CONFIG from "../../utils/axiosHeaderConfig";
import {
  setIsChangePassword,
  setIsChangeProPic,
  setIsSettingsModalOpen,
  setProfile,
} from "../../features/settings/settingsSlice";

//API endpoint
const API = process.env.REACT_APP_API_PROD_URL;
// const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;
// let user = {};
let createdDate = "";
let loginDate = "";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isOpen } = useSelector((store) => store.modal);
  const { user } = useSelector((store) => store.profile);
  const { profile } = useSelector((store) => store.settings);
  const { isLoading, errorMessage } = useSelector((store) => store.user);
  const { openAlert } = useSelector((store) => store.alert);

  // get user id
  const { I } = user;

  // const { p } = JSON.parse(localStorage.getItem("p"));
  const getUser = async () => {
    try {
      dispatch(setOpenAlert(false));
      dispatch(setIsLoading(true));

      const { data } = await axios.get(`${API}/users/profile/${I}`, CONFIG);
      dispatch(setProfile(data));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("error"));
      dispatch(setMessage(`Error: ${err.message}`));
      dispatch(setIsLoading(false));
    }
  };

  //get users
  useEffect(() => {
    getUser();
  }, []);

  // change pro pic
  const handleChangePropic = () => {
    dispatch(setIsSettingsModalOpen(true)); //open modal
    dispatch(setIsChangeProPic(true)); //show change password form
  };

  // change password
  const handleChangePassword = () => {
    dispatch(setIsSettingsModalOpen(true));
    dispatch(setIsChangePassword(true));
  };

  return (
    <>
      {isOpen && <ChangePasswordForm />}
      {/* {openAlert && <AlertMsg severity={"error"} message={errorMessage} />} */}
      <Grid item xs={12}>
        {/* <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        > */}
        {/* <CloseBtn /> */}
        <Title>Your Profile</Title>

        {/* checking for the API response */}
        {isLoading ? (
          <Progress />
        ) : (
          <Grid item container spacing={2}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div onClick={handleChangePropic} style={{ cursor: "pointer" }}>
                <PersonIcon sx={{ fontSize: "10rem", color: "grey" }} />
              </div>
            </Grid>
            <Grid item xs={6} sx={{ padding: 2 }}>
              <Typography
                component="p"
                variant="h4"
                style={{ flex: 3, fontSize: "48px", marginTop: "10px" }}
              >
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography style={{ color: "grey" }}>
                {profile?.user_role?.role}
              </Typography>
              <Divider />
              <Grid
                item
                container
                direction="column"
                sx={{ paddingTop: "18px" }}
              >
                <Grid container spacing={10}>
                  <Grid item xs={6} style={{ color: "#cac8c8da" }}>
                    <Typography gutterBottom>Usename</Typography>
                    <Typography gutterBottom>Email</Typography>
                    <Typography gutterBottom>Role</Typography>
                    <Typography gutterBottom>Company</Typography>
                    <Typography gutterBottom>Branch</Typography>
                    <Typography gutterBottom> Account Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Editable initialText={profile?.userName} />
                    <Editable initialText={profile?.userEmail} />
                    {/* <Typography gutterBottom>jdoe</Typography> */}
                    <Typography gutterBottom>
                      {profile?.user_role?.role}
                    </Typography>
                    <Typography gutterBottom>
                      {profile?.partner?.name}
                    </Typography>
                    <Typography gutterBottom>Port Moresby</Typography>
                    <Typography gutterBottom>Active</Typography>
                    <Tooltip title="Change your password" placement="top">
                      <Button
                        variant="outlined"
                        sx={{
                          mt: 3,
                          ml: 1,
                        }}
                        style={{
                          color: "#f3754c",
                          "&:hover": "#EB3C47",
                          border: "1px solid #f3754c",
                        }}
                        onClick={handleChangePassword}
                        startIcon={<LockResetIcon />}
                      >
                        Password
                      </Button>
                    </Tooltip>
                  </Grid>
                  {/* <SettingModal /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {/* </Paper> */}
      </Grid>
    </>
  );
};

export default Profile;
