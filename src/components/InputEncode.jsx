import { Button, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../features/alert/alertSlice";
import { setIsEncoded } from "../features/application/applicationSlice";
import { setInfoModalOpen } from "../features/settings/settingsSlice";
import { axiosInstance } from "../utils/axiosHeaderConfig";

const InputEncode = () => {
  // state
  const dispatch = useDispatch();
  const [clientId, setClientId] = useState("");
  const [fincorpApplicationId, setFincorpApplicationId] = useState("");
  const { applicationId } = useSelector((state) => state.application);
  const { user } = useSelector((state) => state.profile);

  // handle show alert
  const handleShowAlert = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // alert(applicationId, fincorpApplicationId, clientId);

    try {
      const encodeApplication = await axiosInstance.patch(
        `/applications/${applicationId}/encode`,
        {
          reviewedBy: user?.I,
          encoded: 9,
          fincorpClientId: clientId,
          fincorpAccountId: fincorpApplicationId,
        }
      );

      if (!encodeApplication) {
        return handleShowAlert("error", "error encoding application");
      }

      handleShowAlert("success", "Application information successfully saved");

      // close modal
      dispatch(setInfoModalOpen(false));
      dispatch(setIsEncoded(false));
    } catch (error) {
      console.error(error);
      handleShowAlert("error", error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <TextField
          id="fincorpClientId"
          label={`Please enter finPOWER client Id here`}
          variant="standard"
          onChange={(e) => setClientId(e.target.value)}
          sx={{ width: "100%", m: 1 }}
          required
        />
        <TextField
          id="fincorpApplicationId"
          label={`Please enter finPOWER application Id here`}
          variant="standard"
          onChange={(e) => setFincorpApplicationId(e.target.value)}
          sx={{ width: "100%", m: 1 }}
          required
        />
        <Tooltip title={"Encode application"} placement="top">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="hover"
            style={{ backgroundColor: "#EB3C47" }}
          >
            Submit
          </Button>
        </Tooltip>
      </form>
    </div>
  );
};

export default InputEncode;
