import React from "react";
import { useDispatch } from "react-redux";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../features/alert/alertSlice";

const HandleAlert = ({ status, message }) => {
  const dispatch = useDispatch();

  const handleOpenAlert = (severity, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(severity));
    dispatch(setMessage(message));
  };

  return <>{handleOpenAlert(status, message)}</>;
};

export default HandleAlert;
