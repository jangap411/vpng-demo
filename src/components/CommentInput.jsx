import React, { useState } from "react";
import { Button, TextField, Tooltip } from "@mui/material";

// state
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../features/alert/alertSlice";
import { toggleModal } from "../features/modal/modalSlice";
import { setIsDeclined } from "../features/application/applicationSlice";
import { axiosInstance } from "../utils/axiosHeaderConfig";

//API
const API = process.env.REACT_APP_API_PROD_URL;

const CommentInput = () => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.profile);
  const { singleApplication, reject } = useSelector(
    (state) => state.application
  );
  const USER_ID = user?.I;
  const id = singleApplication?.Id;

  //on click event for button
  const handleDeclinedApplication = async () => {
    try {
      // check comment
      if (comment.length <= 0) {
        dispatch(setMessage("Please provide a descriptive comment."));
        dispatch(setSeverity("warning"));
        dispatch(setOpenAlert(true));
        return;
      }

      // reject applications
      if (reject) {
        await axiosInstance.patch(`${API}/applications/${id}/reject`, {
          approved: 6,
          comment: comment,
          reviewedBy: USER_ID,
        });

        dispatch(setMessage("Loan Application Rejected."));
        dispatch(setOpenAlert(true));
        dispatch(setSeverity("success"));
        dispatch(toggleModal(false));
        dispatch(setIsDeclined(false));
      } else {
        // axios call to decline application
        await axiosInstance.patch(`${API}/applications/${id}/decline`, {
          approved: 3,
          comment: comment,
          reviewedBy: USER_ID,
        });

        dispatch(setMessage("Loan Application Declined."));
        dispatch(setOpenAlert(true));
        dispatch(setSeverity("success"));
        dispatch(toggleModal(false));
        dispatch(setIsDeclined(false));
      }
    } catch (error) {
      if (error?.response && error.response?.data) {
        dispatch(setSeverity(error?.response?.data?.status));

        dispatch(setMessage(error?.response?.data?.data));
      } else {
        dispatch(setSeverity("error"));
        dispatch(setMessage(error.message));
      }
      dispatch(setOpenAlert(true));
    }
  };

  return (
    <div>
      <TextField
        id="standard-multiline-static"
        label={`Add your note stating why you are ${
          reject ? "rejecting" : "declining"
        } this application.`}
        multiline
        rows={3}
        defaultValue={comment}
        variant="standard"
        onChange={(e) => setComment(e.target.value)}
        sx={{ width: "100%", backgroundColor: "#f8f4f4" }}
      />
      <Tooltip
        title={reject ? "Reject this application" : "Decline this application"}
        placement="top"
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          className="hover"
          style={{ backgroundColor: "#EB3C47" }}
          onClick={handleDeclinedApplication}
        >
          {reject ? "Reject" : "Decline"} Application
        </Button>
      </Tooltip>
    </div>
  );
};

export default CommentInput;
