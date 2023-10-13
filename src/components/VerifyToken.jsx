import Cookies from "js-cookie";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { setIsSignedIn } from "../features/profile/profileSlice";

import {
  setOpenAlert,
  setMessage,
  setSeverity,
  setOpenAlertMsg,
} from "../features/alert/alertSlice";
import { useDispatch } from "react-redux";

const VerifyToken = ({ children }) => {
  //   const [cookie, setCookie] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const a = true;
  //
  let delay = 480000; //480 seconds -> 8mins

  let timeId = setInterval(() => {
    if (Cookies.get("access-token") === undefined) {
      //stop counter
      clearTimeout(timeId);
      dispatch(setMessage("Your session has expired. Please login."));
      dispatch(setSeverity("error"));
      // dispatch(setOpenAlert(true));
      dispatch(setOpenAlertMsg(true));
      dispatch(setIsSignedIn(false));
      console.log("Your session has expired. Please login.");
      localStorage.removeItem("p");
      localStorage.removeItem("u");
      navigate("/login");
    }
    console.log("verify token");
  }, delay);

  return <>{a ? children : <Navigate to="/login" replace={true} />}</>;
};

export default VerifyToken;
