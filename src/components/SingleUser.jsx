import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import FormModal from "./FormModal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Progress from "./Progress";
import Cookies from "js-cookie";
//state
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../features/modal/modalSlice";
import {
  setIsLoading,
  setUpdateUserInfo,
  setUser,
} from "../features/user/userSlice";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../features/alert/alertSlice";

//API endpoint
const API = process.env.REACT_APP_API_PROD_URL;
const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;
// let user = {};
let createdDate = "";
let loginDate = "";

const SingleUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isOpen } = useSelector((store) => store.modal);
  const { isLoading, errorMessage, user } = useSelector((store) => store.user);
  const [isDisabled, setIsDisabled] = useState(false);
  const [company, setCompany] = useState("");
  const [disabled, setDisabled] = useState(0);

  const handleEdit = () => {
    dispatch(toggleModal(true));
  };

  const { p } = localStorage.getItem("p")
    ? JSON.parse(localStorage.getItem("p"))
    : { p: null };

  //axios config
  const CONFIG = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getUser = async () => {
    try {
      dispatch(setOpenAlert(false));
      dispatch(setIsLoading(true));
      /*TODO: 
      1. dynamically added partner id based on login credentials
      2. check if the user role is admin or manager
      */
      // axios api call

      // get user & partner id

      const { data } = await axios.get(
        `${API}/partners/${p}/users/${id}`,
        CONFIG
      );

      dispatch(setIsLoading(false));

      if (data.length <= 0) {
        dispatch(setOpenAlert(true));
        dispatch(setSeverity("error"));
        dispatch(setMessage(`Error: cannot find user ${id}`));
        navigate("/users");
        return console.log(errorMessage);
      } else {
        dispatch(setIsLoading(false));
        dispatch(setUser(data.user));
        createdDate = user.dateCreated;
        loginDate = user.lastLoginDate;
      }
    } catch (err) {
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("error"));
      dispatch(setMessage(`Error: ${err.message}`));
      console.error(err);

      // custom error message for id not found
      if (err.response && err.response.status === 404) {
        dispatch(setOpenAlert(true));
        dispatch(setSeverity("error"));
        dispatch(setMessage(`${err.response.data.message}`));
        // navigate("/users");
      }
      dispatch(setIsLoading(false));
    }
  };

  //disable account
  const disableAccount = async () => {
    try {
      dispatch(setOpenAlert(false));
      dispatch(setIsLoading(true));
      setIsDisabled(true);

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(options);
      const user = await axios.patch(
        `${API}/partners/${p}/users/${id}/disable-account`,
        {},
        options
      );
      console.log(user);
      dispatch(setIsLoading(false));
      setIsDisabled(false);
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("success"));
      dispatch(setMessage(`${user.data.message}`));
      setDisabled(1);
    } catch (err) {
      console.error(err);
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("error"));
      setIsDisabled(false);
      dispatch(setIsLoading(false));
      dispatch(setMessage(`Error: ${err.message}`));

      /* custom error*/
      if (err.response && err.response.data) {
        dispatch(setMessage(`${err.response.data.message}`));
      }
    }
  };

  //get users
  useEffect(() => {
    getUser();
    dispatch(setUpdateUserInfo(true));

    let name = user.partner ? user?.partner.name : "--";
    setCompany(name);
  }, [disabled]); //TODO: fix render on account reload

  return (
    <>
      {isOpen && <FormModal />}
      {/* {openAlert && <AlertMsg severity={"error"} message={errorMessage} />} */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                <SupervisorAccountIcon
                  sx={{ fontSize: "8rem", color: "grey" }}
                />
                <Tooltip title="Go Back" placement="top">
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      ml: 1,
                    }}
                    style={{
                      backgroundColor: "#f3754c",
                      "&:hover": "#f3754c",
                    }}
                    startIcon={<ArrowLeftIcon />}
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sx={{ padding: 2 }}>
                <Typography
                  component="p"
                  variant="h4"
                  style={{ flex: 3, fontSize: "48px", marginTop: "10px" }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography style={{ color: "grey" }}>
                  {user.user_roles_Id === 1 ? "Admin" : null}
                  {user.user_roles_Id === 2 ? "Manager" : null}
                  {user.user_roles_Id === 3 ? "Staff" : null}
                  {user.user_roles_Id === 4 ? "Client" : null}
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

                      <Tooltip title="Edit Account" placement="top">
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
                          onClick={handleEdit}
                          startIcon={<ModeEditIcon />}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{user?.userName}</Typography>
                      <Typography gutterBottom>
                        {user?.userEmail ? user.userEmail : "--"}
                      </Typography>
                      <Typography gutterBottom>
                        {user.user_roles_Id === 1 ? "Admin" : null}
                        {user.user_roles_Id === 2 ? "Manager" : null}
                        {user.user_roles_Id === 3 ? "Staff" : null}
                        {user.user_roles_Id === 4 ? "Client" : null}
                      </Typography>
                      <Typography gutterBottom>{company}</Typography>
                      <Typography gutterBottom>{"--"}</Typography>
                      <Typography gutterBottom>
                        {user.isActive === 1 ? "Active" : "Disable"}
                      </Typography>

                      {isDisabled ? (
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          startIcon={
                            user.isActive ? <PersonOffIcon /> : <PersonIcon />
                          }
                          variant="outlined"
                          sx={{
                            mt: 3,
                            ml: 1,
                          }}
                          style={{
                            backgroundColor: "#EB3C47",
                            "&:hover": "#EB3C47",
                          }}
                        >
                          Disable
                        </LoadingButton>
                      ) : (
                        <Tooltip
                          title={
                            user.isActive ? "Disable account" : "Enable account"
                          }
                          placement="top"
                        >
                          <Button
                            variant="contained"
                            sx={{
                              mt: 3,
                              ml: 1,
                            }}
                            style={{
                              backgroundColor: "#EB3C47",
                              "&:hover": "#EB3C47",
                            }}
                            startIcon={
                              user.isActive ? <PersonOffIcon /> : <PersonIcon />
                            }
                            onClick={disableAccount}
                          >
                            {user.isActive ? "Disable" : "Enable"}
                          </Button>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </>
  );
};

export default SingleUser;
