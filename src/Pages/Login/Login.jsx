import React, { useState } from "react";
import "./login.css";
import logo from "../../logo-fab.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import AlertMsg from "../../components/AlertMsg";
import { CircularProgress } from "@mui/material";
// state
import { useDispatch, useSelector } from "react-redux";
import {
  setProfile,
  setProfileName,
  setSessionToken,
  setUser,
} from "../../features/profile/profileSlice";

import {
  setOpenAlert,
  setSeverity,
  setMessage,
  setOpenAlertMsg,
} from "../../features/alert/alertSlice";
import { setIsSignedIn } from "../../features/profile/profileSlice";
// import AlertMessage from "./AlertMessage";
// import { setCardStateClear } from "../../features/cards/cardSlice";

// Global constant variable
const API = process.env.REACT_APP_API_PROD_URL;
const SECURE_FLAG = process.env.REACT_APP_SECURE_COOKIE;
const HTTP_ONLY = process.env.REACT_APP_COOKIE_HTTPONLY;
const MINUTES = process.env.REACT_APP_MINUTES;

// cookie expiry date
let EXPIRED_DATE = new Date(new Date().getTime() + MINUTES * 60 * 1000); //expires in 30 minutes

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  // const { name } = useSelector((store) => store.profile);
  const { alertMsg } = useSelector((store) => store.alert);
  const { isSignedIn } = useSelector((store) => store.profile);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    userName: username,
    password: password,
  };

  let prof = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API}/authenticate`, user);
      let { token } = data;

      // create access cookie
      Cookies.set("access-token", token, {
        // secure: SECURE_FLAG,
        // httpOnly: HTTP_ONLY,
        expires: EXPIRED_DATE,
      });

      // decode token and set login details to App state
      let decode = jwt_decode(token);
      dispatch(setProfileName(username));

      // set user login to localStorage
      prof = {
        p: decode.p,
        u: decode.I,
        name: `${decode.f} ${decode.l}`,
        a: true,
      };

      //check localstorage
      if (localStorage.getItem("p")) {
        localStorage.removeItem("p");
      }

      if (localStorage.getItem("u")) {
        localStorage.removeItem("u");
      }

      localStorage.setItem("p", JSON.stringify(prof));
      localStorage.setItem("u", JSON.stringify(decode));

      dispatch(setSessionToken(token));
      dispatch(setProfile(decode));
      dispatch(setUser(decode));
      dispatch(setIsSignedIn(true));
      // dispatch(setCardStateClear());

      //redirect to dashboard
      window.location = "/dashboard"; //FIXME:use react router instead
      // navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      dispatch(setMessage(error.message));
      dispatch(setSeverity("error"));

      if (error.response && error.response.data) {
        // dispatch(setMessage("This account is disable."));
        dispatch(setMessage(error.response.data.data));
        dispatch(setSeverity(error.response.data.status));
      }

      dispatch(setOpenAlert(true));
      dispatch(setOpenAlertMsg(true));
    }
  };

  // password input focus
  const handlePasswordFocused = () => {
    let password = document.getElementById("password");
    // passwordremoveAttribute("readonly");
    password.removeAttribute("readonly");
  };

  // password input out of focus
  const handleFocusOut = () => {
    let password = document.getElementById("password");
    password.setAttribute("password", "readonly");
  };

  return (
    <>
      {/* {openAlert && <AlertMsg severity={severity} message={message} />} */}
      {/* {alertMsg && (
        <div style={{ margin: "0 auto", width: "60%" }}>{<AlertMessage />}</div>
      )} */}
      <div className="bg-gradient">
        <div className="login-container">
          <div className="login-text">
            <img src={logo} alt="fincorp logo" />
            <h1>Welcome, please login</h1>
          </div>
          <div className="login-form">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <div className="form-fields">
                  <div className="form-group-input">
                    <p>Username</p>
                    <input
                      type="text"
                      id="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group-input">
                    <p>Password</p>
                    <input
                      id="password"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={handlePasswordFocused}
                      onBlur={handleFocusOut}
                      readOnly
                    />
                  </div>
                  {/* {isSignedIn && <Navigate to="/dashboard" replace={true} />} */}
                  <div className="form-group-input">
                    <input type="submit" value="Login" />
                    {isLoading && (
                      <CircularProgress
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
