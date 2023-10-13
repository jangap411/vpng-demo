import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Link,
  Paper,
  Button,
  Tooltip,
  IconButton,
  Chip,
  Alert,
} from "@mui/material";
import Progress from "./Progress";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PARTNERS, ROLES } from "../utils/checkUserPartnerAndRole";

//icons
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ReportOffIcon from "@mui/icons-material/ReportOff";
import CancelIcon from "@mui/icons-material/Cancel";
// state
import { useDispatch, useSelector } from "react-redux";
import {
  setApplicationId,
  setErrorMessage,
  setIsApproved,
  setIsCdbAmount,
  setIsDeclined,
  setIsEncoded,
  setReject,
  setSingleApplication,
} from "../features/application/applicationSlice";
import {
  setOpenAlert,
  setSeverity,
  setMessage,
} from "../features/alert/alertSlice";
import { toggleModal } from "../features/modal/modalSlice";
import CONFIG from "../utils/axiosHeaderConfig";
import { setInfoModalOpen } from "../features/settings/settingsSlice";

//API
const API = process.env.REACT_APP_API_PROD_URL;

let application = {};

// application component
const Application = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.profile);

  /*
    create bool value to show the action buttons
  */

  // fincorp
  const allowPartners = [PARTNERS.FINCORP];
  const allowedRoles = [ROLES.STAFF];
  const ACCESS = allowPartners.includes(user?.p);
  const ROLE_ACCESS = allowedRoles.includes(user?.r);

  const { singleApplication, isDeclined, isApproved } = useSelector(
    (state) => state.application
  );
  const USER_ID = user?.I;

  // handle show alert
  const handleShowAlert = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setErrorMessage(message));
    dispatch(setMessage(message));
  };

  const getApplication = async () => {
    try {
      dispatch(setOpenAlert(false));
      //api call

      const { data } = await axios.get(`${API}/applications/${id}`, CONFIG);
      setIsLoading(false);

      if (data.length <= 0) {
        dispatch(setOpenAlert(true));
        dispatch(setSeverity("error"));
        dispatch(setErrorMessage(`Error: Cannot find application ${id}`));
        dispatch(setMessage(`Error: Cannot find application ${id}`));
      } else {
        // response.data.map((app) => (application = app));

        dispatch(setSingleApplication(data));
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("error"));
      dispatch(setErrorMessage(`Error: ${error.message}`));
      dispatch(setMessage(`Error: ${error.message}`));
    }
  };

  // get buttons
  const approveBtn = document.getElementById("approve-btn");
  const declineBtn = document.getElementById("declined-btn");

  //declined button click
  const handleDecline = () => {
    if (declineBtn.innerText === "REJECT") {
      dispatch(setReject(true));
    } else {
      dispatch(setReject(false));
    }

    dispatch(setIsDeclined(true));
    dispatch(toggleModal(true));
  };

  // approve loan application
  const handleApproveLoan = async () => {
    try {
      // OSG USER
      if (approveBtn.innerText === "ACCEPT") {
        // CDB check
        if (singleApplication.amountApplied > 5000) {
          dispatch(setApplicationId(id));
          dispatch(setIsCdbAmount(true));
          dispatch(toggleModal(true));
          return;
        }

        // axios call to accept application
        await axios.patch(
          `${API}/applications/${id}/accept`,
          { approved: 5, comment: "", reviewedBy: USER_ID },
          CONFIG
        );

        handleShowAlert("success", "Application accepted");
      }

      // OSG USER --> encode finpower
      if (approveBtn.innerText === "ENCODE") {
        dispatch(setApplicationId(id));
        dispatch(setIsEncoded(true));
        dispatch(setInfoModalOpen(true));
      }

      // OSG Manager
      if (approveBtn.innerText === "APPROVE") {
        // axios call to approve application
        await axios.patch(
          `${API}/applications/${id}`,
          { approved: 2, comment: "", reviewedBy: USER_ID },
          CONFIG
        );

        dispatch(setIsApproved(true));
        handleShowAlert("success", "Application approved");
      }
    } catch (error) {
      console.error(error);
      if (error?.response && error.response?.data) {
        dispatch(setSeverity(error?.response?.data?.status));
        dispatch(setErrorMessage(error?.response?.data?.data));
        dispatch(setMessage(error?.response?.data?.data));
      } else {
        dispatch(setSeverity("error"));
        dispatch(setErrorMessage(error.message));
        dispatch(setMessage(error.message));
      }
      dispatch(setOpenAlert(true));
    }
  };

  useEffect(() => {
    getApplication();
  }, [isDeclined]);

  useEffect(() => {
    getApplication();
  }, [isApproved]);

  useEffect(() => {
    getApplication();
    console.log(singleApplication);
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Grid sx={{ p: 0, m: 0 }}>
            <Chip
              label={singleApplication?.application_status?.status}
              title={`Application status: ${singleApplication?.application_status?.status}`}
              sx={{ p: 0, m: 0, cursor: "pointer" }}
            />

            <Tooltip title="Close" placement="right">
              <IconButton
                aria-label="close"
                component="label"
                sx={{ float: "right", p: 0, m: 0 }}
                onClick={() => navigate(-1)}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <div style={{ padding: "0 2rem" }}>
            {isLoading ? (
              <Progress />
            ) : (
              <>
                <div>
                  <Typography variant="h5" align="center">
                    Review Loan Application
                  </Typography>
                  <Typography variant="h6" gutterBottom align="center">
                    {singleApplication?.application_type?.type}
                  </Typography>
                  {singleApplication.comments ? (
                    <>
                      <Alert
                        severity={
                          singleApplication?.application_status_Id == 5
                            ? "success"
                            : "warning"
                        }
                        sx={{ mb: 1 }}
                      >
                        {singleApplication.comments}
                      </Alert>
                    </>
                  ) : null}
                </div>
                <Grid container spacing={2}>
                  <Grid item container direction="column" xs={12}>
                    <Typography component="h2" variant="subtitle1" gutterBottom>
                      Personal Details
                    </Typography>
                    <Grid container>
                      <Grid item xs={2} style={{ color: "#6d6d6dda" }}>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Name
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Gender
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Date of Birth
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Marital Status
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Dependents
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <div>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client?.firstName}{" "}
                            {singleApplication?.client?.lastName}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client.gender}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client.dateOfBirth}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client.maritalStatus}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client.dependents}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2} style={{ color: "#6d6d6dda" }}>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Lot Number
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Section
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Surburb
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Street
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          City
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Province
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Village
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          District
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Apartment
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Unit Number
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Settlement
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Contact Numbers
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Email Address
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.lotNo
                            ? singleApplication?.client?.address?.lotNo
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.sectionNo
                            ? singleApplication?.client?.address?.sectionNo
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.surburb
                            ? singleApplication?.client?.address?.surburb
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.street
                            ? singleApplication?.client?.address?.street
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.province?.city
                            ? singleApplication?.client?.address?.province?.city
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.province?.name
                            ? singleApplication?.client?.address?.province?.name
                            : "--"}
                        </Typography>

                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.village
                            ? singleApplication?.client?.address?.village
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.district
                            ? singleApplication?.client?.address?.district
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.apartmentName
                            ? singleApplication?.client?.address?.apartmentName
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.unitNo
                            ? singleApplication?.client?.address?.unitNo
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.address?.settlement
                            ? singleApplication?.client?.address?.settlement
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.contact?.mobile
                            ? singleApplication?.client?.contact?.mobile
                            : "--"}
                          ,{" "}
                          {singleApplication?.client?.contact?.phone
                            ? singleApplication?.client?.contact?.phone
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.contact?.emailAddress
                            ? singleApplication?.client?.contact?.emailAddress
                            : "--"}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          {singleApplication?.client?.contact?.postalAddress
                            ? singleApplication?.client?.contact?.postalAddress
                            : "--"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container direction="column" xs={8} sm={4}>
                    <Typography
                      component="h2"
                      variant="subtitle1"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Employer details
                    </Typography>
                    <Grid container>
                      <Grid item xs={4} style={{ color: "#6d6d6dda" }}>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Employer:{" "}
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Staff ID
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Employment Date
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Position
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Department
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Payroll Officer
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Contact Numbers
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Email
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Attachments
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Address
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.employmentdetails[0]
                                ?.employer.name
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.employmentdetails[0]
                                ?.staffId
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.employmentdetails[0]
                                ?.employmentDate
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.employmentdetails[0]
                                ?.position
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            --
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.employmentdetails[0]
                                ?.payMaster
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {application?.employerMobile
                              ? application?.employerMobile
                              : "--"}
                            ,{" "}
                            {application?.employerPhone
                              ? application?.employerPhone
                              : "--"}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client?.employmentdetails[0]
                              ?.employer.emailAddress
                              ? singleApplication?.client?.employmentdetails[0]
                                  ?.employer.emailAddress
                              : "--"}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            <Link
                              href={`${process.env.REACT_APP_API_SVR_HOST}/download/${singleApplication?.aplicationAttachments}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              // onClick={handleDownload}
                            >
                              {singleApplication?.aplicationAttachments}
                            </Link>
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.client?.employmentdetails[0]
                              ?.employer?.address
                              ? singleApplication?.client?.employmentdetails[0]
                                  ?.employer?.address
                              : "--"}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" xs={8} sm={4}>
                    <Typography
                      component="h2"
                      variant="subtitle1"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Loan details
                    </Typography>
                    <Grid container>
                      <Grid item xs={6} style={{ color: "#6d6d6dda" }}>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Invoice Number
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Application Type
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Amount Applied
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Repayment Amount
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Loan Term
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Purpose
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.invoiceNumber}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication?.application_type?.type}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            PGK{singleApplication.amountApplied}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            PGK{singleApplication.repaymentAmount}
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication.term} Fortnight(s)
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {singleApplication.purpose}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" xs={8} sm={4}>
                    <Typography
                      component="h2"
                      variant="subtitle1"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Bank details
                    </Typography>
                    <Grid container>
                      <Grid item xs={6} style={{ color: "#6d6d6dda" }}>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Bank
                        </Typography>

                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Account Name
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Account Number
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Account Type
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          BSB Number
                        </Typography>
                        <Typography gutterBottom style={{ fontSize: "13px" }}>
                          Branch
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.bankaccdetail
                                ?.bank_branch?.bank?.name
                            }
                          </Typography>

                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.bankaccdetail
                                ?.accountName
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.bankaccdetail
                                ?.accountNumber
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.bankaccdetail
                                ?.accountType
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.bankaccdetail
                                ?.bank_branch?.bsb
                            }
                          </Typography>
                          <Typography gutterBottom style={{ fontSize: "13px" }}>
                            {
                              singleApplication?.client?.bankaccdetail
                                ?.bank_branch?.branch
                            }
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {ACCESS && (
                    <>
                      <Grid item container direction="column" xs={8} sm={4}>
                        <Tooltip
                          title={
                            // ROLE_ACCESS
                            //   ? "Accept this loan application"
                            //   : "Approve this loan application"
                            ROLE_ACCESS
                              ? ROLE_ACCESS &&
                                singleApplication?.application_status?.status ==
                                  "approved"
                                ? "Encode this loan application"
                                : "Accept this loan application"
                              : "Approve this loan application"
                          }
                          placement="top-start"
                        >
                          <Button
                            variant="contained"
                            sx={{
                              mt: 3,
                              ml: 1,
                            }}
                            style={{
                              backgroundColor: "#f3754c",
                              "&:hover": "#EB3C47",
                            }}
                            startIcon={<TaskAltIcon />}
                            onClick={handleApproveLoan}
                            disabled={
                              // singleApplication?.comments ? true : false
                              false
                            }
                            id="approve-btn"
                          >
                            {/* {ROLE_ACCESS ? "Accept" : "Approve"} */}
                            {ROLE_ACCESS
                              ? ROLE_ACCESS &&
                                singleApplication?.application_status?.status ==
                                  "approved"
                                ? "Encode"
                                : "Accept"
                              : "Approve"}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        xs={8}
                        sm={4}
                      ></Grid>
                      <Grid item container direction="column" xs={8} sm={4}>
                        <Tooltip
                          title={
                            ROLE_ACCESS
                              ? "Reject this loan application"
                              : "Decline this loan application"
                          }
                          placement="top-start"
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
                            startIcon={<ReportOffIcon />}
                            onClick={handleDecline}
                            id="declined-btn"
                          >
                            {ROLE_ACCESS ? "Reject" : "Decline"}
                          </Button>
                        </Tooltip>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default Application;
