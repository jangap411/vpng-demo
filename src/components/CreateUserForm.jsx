import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Box,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Title from "./Title";
// state
import {
  setFirstName,
  setLastName,
  setRole,
  setPassword,
  setBranch,
  setUsername,
  setErrorMessage,
  setCompany,
  setRoles,
  setEmail,
  setUpdateUserInfo,
  setUser,
  setClearUserState,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../features/alert/alertSlice";
import { getUserList } from "../features/user/userSlice";
import { closeModal } from "../features/modal/modalSlice";
import { useParams } from "react-router-dom";
import {
  getPartnersList,
  setPartners,
} from "../features/partners/partnerSlice";
import { PARTNERS, ROLES } from "../utils/checkUserPartnerAndRole";
import CONFIG from "../utils/axiosHeaderConfig";

//API
const API = process.env.REACT_APP_API_PROD_URL;
//FIXME: set token dynamically from from authentication
const { p, u } = localStorage.getItem("p")
  ? JSON.parse(localStorage.getItem("p"))
  : { p: "", u: "" };

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    firstName,
    lastName,
    email,
    role,
    username,
    password,
    branch,
    company,
    roles,
    user,
    updateUserInfo,
  } = useSelector((store) => store.user);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);

  // GET PARTNERS LIST
  // global state values
  const { partners } = useSelector((state) => state.partners);
  const { user: profile } = useSelector((state) => state.profile);

  const PARTNER_ID = profile?.p;
  const USER_ROLES_ID = profile?.r;
  //allowed roles
  const user_roles = [ROLES.ADMIN];
  const ALLOWED_ROLES = user_roles.includes(USER_ROLES_ID);

  //form submit

  const newUser = {
    firstName,
    lastName,
    userName: username,
    userEmail: email,
    password,
    roleId: role,
    divisionId: branch,
    oldPassword: password,
    branch_Id: 2, //TODO:Get branch ID from database
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn").innerText;
    console.log(btn);

    try {
      if (btn === "ADD USER") {
        if (password !== confirmPassword) {
          setIsError(true);
          dispatch(setSeverity("error"));
          dispatch(setOpenAlert(true));
          dispatch(
            setMessage(
              "The Passwords you entered do not match. Please try again."
            )
          );
        }

        const response = await axios.post(
          `${API}/partners/${company}/users`,
          newUser,
          CONFIG
        );
        dispatch(setSeverity(`${response.data.status}`));
        dispatch(setOpenAlert(true));
        dispatch(setMessage(`${response.data.data}`));
        dispatch(closeModal(false));
        dispatch(getUserList());
        dispatch(setUpdateUserInfo(false));
      } else {
        const updateUser = {
          firstName,
          lastName,
          userName: username,
          oldPassword: password,
          userEmail: email,
          password: confirmPassword,
          roleId: role,
          divisionId: branch,
          branch_Id: 2, //TODO:Get branch ID from database
        };

        console.log(
          `OLD:${updateUser.oldPassword}, NEW:${updateUser.password}, ID:${id}`
        );

        const response = await axios.patch(
          `${API}/partners/${p}/users/${id}/update-info`,
          updateUser,
          CONFIG
        );

        console.log(response.data);
        dispatch(setSeverity(`${response.data.status}`));
        dispatch(setOpenAlert(true));
        dispatch(setMessage(`${response.data.data}`));
        dispatch(closeModal(false));
        dispatch(getUserList());
        dispatch(setClearUserState());
      }
    } catch (error) {
      setIsError(true);
      dispatch(setSeverity("error"));
      dispatch(setOpenAlert(true));
      setErrorMessage(`${error}`);
      dispatch(setMessage(`${error}`));

      console.error(error);
      if (error.response && error.response.data) {
        dispatch(setSeverity(error.response.data.status));
        dispatch(setMessage(`${error.response.data.data}`));
        setErrorMessage(`${error.response.data.data}`);
        dispatch(setOpenAlert(true));
      }
    }
  };

  //get user roles
  const getRoles = async () => {
    try {
      if (ALLOWED_ROLES) {
        const { data } = await axios.get(`${API}/partners/${p}/roles`, CONFIG);
        // set roles to app state
        dispatch(setRoles(data.roles));
      } else {
        const { data } = await axios.get(
          `${API}/partners/${p}/roles/${USER_ROLES_ID}`,
          CONFIG
        );
        // set roles to app state
        dispatch(setRoles(data.roles));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPartners = async () => {
    try {
      if (ALLOWED_ROLES) {
        dispatch(getPartnersList());
      } else {
        const { data } = await axios.get(
          `${API}/partners/users/${PARTNER_ID}`,
          CONFIG
        );
        dispatch(setPartners(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //show speed dial
    getPartners();
  }, []);

  useEffect(() => {
    // populate fields
    if (updateUserInfo) {
      dispatch(setFirstName(user?.firstName));
      dispatch(setLastName(user?.lastName));
      dispatch(setUsername(user?.userName));
      dispatch(setEmail(user?.userEmail));
      dispatch(setCompany(user?.partner?.name));
      dispatch(setBranch(user.firstName));
      dispatch(setRole(user.firstName));
    }
  }, []);

  useEffect(() => {
    dispatch(setOpenAlert(false));
    getRoles();
  }, []);

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
            <Title>Add new User</Title>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  autoFocus
                  variant="standard"
                  label="Enter First Name"
                  onChange={(e) => dispatch(setFirstName(e.target.value))}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  autoFocus
                  variant="standard"
                  label="Enter Last Name"
                  onChange={(e) => dispatch(setLastName(e.target.value))}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  autoFocus
                  variant="standard"
                  label="Enter Username"
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                  value={username}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="userEmail"
                  required
                  fullWidth
                  id="userEmail"
                  autoFocus
                  variant="standard"
                  type={"email"}
                  label="Enter email address"
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  value={email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="password"
                  label={
                    updateUserInfo ? "Enter current password" : "Enter password"
                  }
                  required
                  fullWidth
                  id="password"
                  type="password"
                  autoFocus
                  variant="standard"
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="passwordConfirm"
                  label={
                    updateUserInfo ? "Enter new password" : "Confirm Password"
                  }
                  required
                  fullWidth
                  id="passwordConfirm"
                  autoFocus
                  variant="standard"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </Grid>
              <Grid item xs={6} style={{ padding: "8px 0px 0px 15px" }}>
                <InputLabel id="company">Select Company</InputLabel>
                <Select
                  labelId="company"
                  id="company"
                  label="company"
                  variant="standard"
                  value={company}
                  onChange={(e) => dispatch(setCompany(e.target.value))}
                  sx={{ minWidth: "100%" }}
                  style={{
                    padding: "0px",
                    margin: "0px",
                    paddingBottom: "1px",
                  }}
                >
                  {partners.map((partner) => (
                    <MenuItem key={partner.id} value={`${partner.id}`}>
                      {partner.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  name="branch"
                  label="Company Branch"
                  required
                  fullWidth
                  id="branch"
                  autoFocus
                  variant="standard"
                  type="text"
                  value={branch}
                  onChange={(e) => dispatch(setBranch(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} style={{ padding: "8px 0px 0px 15px" }}>
                {/* <FormControl> */}
                <InputLabel id="role">Select Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  label="role"
                  variant="standard"
                  value={role}
                  onChange={(e) => dispatch(setRole(e.target.value))}
                  sx={{ minWidth: "100%" }}
                  style={{
                    padding: "0px",
                    margin: "0px",
                    paddingBottom: "1px",
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.Id} value={`${role.Id}`}>
                      {role.role}
                    </MenuItem>
                  ))}
                </Select>
                {/* </FormControl> */}
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
                >
                  {updateUserInfo ? "Update user" : "Add User"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {/* {openAlert && <AlertMsg severity={severity} message={message} />} */}
    </>
  );
};

export default CreateUserForm;
