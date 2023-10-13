import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { axiosInstance } from "../../../utils/axiosHeaderConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../../../features/alert/alertSlice";
import {
  setIsApproved,
  setIsCdbAmount,
} from "../../../features/application/applicationSlice";
import { toggleModal } from "../../../features/modal/modalSlice";

const CdbCheck = () => {
  const { singleApplication, isDeclined, isApproved } = useSelector(
    (state) => state.application
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { applicationId } = useSelector((state) => state.application);

  console.log(applicationId);
  const USER_ID = user?.I;

  // state
  const [cdbVal, setCdbVal] = useState("");

  // handle show alert
  const handleShowAlert = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    dispatch(setIsApproved(true));
  };

  console.log(cdbVal);

  const handleSubmit = async () => {
    try {
      let comments = "";

      if (cdbVal == 5) {
        comments =
          "The client's application has been accepted following a successful Credit Data Bureau check.";

        // axios call to approve application
        await axiosInstance.patch(`/applications/${applicationId}/accept`, {
          approved: cdbVal,
          comment: comments,
          reviewedBy: USER_ID,
        });
      }

      if (cdbVal == 6) {
        comments =
          "The application has been reject due to the presence of a Credit Data Bureau flag on the applicant's record.";

        // axios call to approve application
        await axiosInstance.patch(`/applications/${applicationId}/reject`, {
          approved: cdbVal,
          comment: comments,
          reviewedBy: USER_ID,
        });
      }

      handleShowAlert("success", "Application submitted");
      dispatch(setIsCdbAmount(false));
      dispatch(toggleModal(false));
    } catch (error) {
      console.error(error);
      handleShowAlert("error", error.message);

      if (error.response && error.response.data) {
        handleShowAlert(error.response.data.status, error.response.data.data);
      }

      dispatch(setIsCdbAmount(false));
      dispatch(toggleModal(false));
    }
  };

  return (
    <FormControl>
      <Alert severity="warning" style={{ fontSize: "17px" }}>
        This client is applying for a loan greater than PGK5000. Please click{" "}
        <a
          href={`https://www.cdb.com.pg/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <u>
            here <OpenInNewIcon sx={{ fontSize: "12px" }} />
          </u>
        </a>{" "}
        to login to the Credit Data Bureau Portal to check eligibility of
        client.
      </Alert>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        sx={{ fontSize: "17px", pt: 3 }}
      >
        Does this applicant pass the CDB check?
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ textAlign: "center" }}
        onChange={(e) => setCdbVal(e.target.value)}
      >
        <Stack direction="row" spacing={12}>
          <FormControlLabel
            value={5}
            control={<Radio color="success" />}
            label="Pass"
          />
          <FormControlLabel
            value={6}
            control={<Radio color="default" />}
            label="Fail"
          />
        </Stack>
      </RadioGroup>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        className="hover"
        style={{ backgroundColor: "#EB3C47" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default CdbCheck;
