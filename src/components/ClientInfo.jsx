import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tooltip,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Progress from "./Progress";

//icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailIcon from "@mui/icons-material/Mail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
//state
import { setClientInfo, setIsLoading } from "../features/client/clientSlice";
import {
  setOpenAlert,
  setSeverity,
  setMessage,
} from "../features/alert/alertSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../utils/axiosHeaderConfig";

const ClientInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { clientInfo, isLoading } = useSelector((store) => store.clients);

  //API call for client details
  const getClientDetails = async () => {
    try {
      //
      dispatch(setIsLoading(true));
      const { data } = await axiosInstance.get(`/clients/${id}`);
      const { client } = data;
      dispatch(setClientInfo(client));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setIsLoading(false));
      dispatch(setSeverity("error"));
      dispatch(setMessage(error.message));
      dispatch(setOpenAlert(true));
    }
  };

  //load client details
  useEffect(() => {
    getClientDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Progress />
      ) : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{ width: "28%", flexShrink: 0, fontWeight: "bold", ml: 1 }}
            >
              {`${clientInfo?.firstName} ${clientInfo?.lastName}`}
            </Typography>
            <Typography
              sx={{
                width: "25%",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="Company Branch" placement="top">
                <BusinessIcon sx={{ width: "18px", height: "18px", mr: 1 }} />
              </Tooltip>
              {clientInfo?.employmentdetails[0]?.employer?.name}
            </Typography>
            {"  "}
            <Typography
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="Email Address" placement="top">
                <MailIcon sx={{ width: "18px", mr: 1, height: "18px" }} />
              </Tooltip>
              {clientInfo?.contact?.emailAddress}
              <Tooltip title="Mobile Number" placement="top">
                <PhoneAndroidIcon
                  sx={{ width: "18px", mr: 1, height: "18px" }}
                />
              </Tooltip>
              {"  "}
              {clientInfo?.contact?.mobile},{" "}
              <Tooltip title="Telephone Number" placement="top">
                <PhoneIcon sx={{ width: "18px", mr: 1, height: "18px" }} />
              </Tooltip>
              {clientInfo?.contact?.phone}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Application /> */}
            <h3 style={{ padding: "8px" }}>Client Details</h3>
            <Stack direction="row" spacing={2}>
              <div>
                <Tooltip title="Address" placement="top">
                  <LocationOnIcon />
                </Tooltip>
              </div>
              <div style={{ width: "30%" }}>
                <Typography
                  sx={{
                    width: "100%",
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {clientInfo?.contact?.postalAddress
                    ? clientInfo?.contact?.postalAddress
                    : "--"}{" "}
                  <br />
                </Typography>
                <Typography
                  sx={{
                    width: "80%",
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Section:{" "}
                  {clientInfo?.address?.sectionNo
                    ? clientInfo?.address?.sectionNo
                    : "--"}
                  , Lot:{" "}
                  {clientInfo?.address?.lotNo
                    ? clientInfo?.address?.lotNo
                    : "--"}
                  <br />
                  Surburb:
                  {clientInfo?.address?.surburb
                    ? clientInfo?.address?.surburb
                    : "--"}
                  , Street:
                  {clientInfo?.address?.street
                    ? clientInfo?.address?.street
                    : "--"}{" "}
                  <br />
                  Apartment:
                  {clientInfo?.address?.apartmentName
                    ? clientInfo?.address?.apartmentName
                    : "--"}
                  , Unit:
                  {clientInfo?.address?.unitNo
                    ? clientInfo?.address?.unitNo
                    : "--"}{" "}
                  <br />
                  Village:
                  {clientInfo?.address?.village
                    ? clientInfo?.address?.village
                    : "--"}{" "}
                  , District:
                  {clientInfo?.address?.district
                    ? clientInfo?.address?.district
                    : "--"}
                  <br />
                  Settlement:
                  {clientInfo?.address?.settlement
                    ? clientInfo?.address?.settlement
                    : "--"}
                </Typography>
              </div>
              <div>
                <Tooltip title="Bank Details" placement="top">
                  <AccountBalanceIcon />
                </Tooltip>
              </div>
              <div style={{ width: "30%" }}>
                <Typography
                  sx={{
                    width: "100%",
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Account Name:{" "}
                  {clientInfo?.bankaccdetail?.accountName
                    ? clientInfo?.bankaccdetail?.accountName
                    : "--"}{" "}
                  <br />
                  Account Number:{" "}
                  {clientInfo?.bankaccdetail?.accountNumber
                    ? clientInfo?.bankaccdetail?.accountNumber
                    : "--"}{" "}
                  <br />
                  Account Type:{" "}
                  {clientInfo?.bankaccdetail?.accountType
                    ? clientInfo?.bankaccdetail?.accountType
                    : "--"}
                  <br />
                  Bank:{" "}
                  {clientInfo?.bankaccdetail?.bank_branch?.bank?.name
                    ? clientInfo?.bankaccdetail?.bank_branch?.bank?.name
                    : "--"}
                  <br />
                  Branch:{" "}
                  {clientInfo?.bankaccdetail?.bank_branch?.branch
                    ? clientInfo?.bankaccdetail?.bank_branch?.branch
                    : "--"}
                  <br />
                  BSB Number:{" "}
                  {clientInfo?.bankaccdetail?.bank_branch?.bsb
                    ? clientInfo?.bankaccdetail?.bank_branch?.bsb
                    : "--"}
                  <br />
                </Typography>
              </div>
              <div>
                <Tooltip title="Employer Details" placement="top">
                  <BusinessIcon />
                </Tooltip>
              </div>
              <div style={{ width: "30%" }}>
                <Typography
                  sx={{
                    width: "100%",
                    color: "text.secondary",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Address: {clientInfo?.employmentdetails[0]?.employer?.address}{" "}
                  <br />
                  Phone:{" "}
                  {clientInfo?.employmentdetails[0]?.employer?.phone
                    ? clientInfo?.employmentdetails[0]?.employer?.phone
                    : "--"}
                  <br />
                  Email Address:{" "}
                  {clientInfo?.employmentdetails[0]?.employer?.emailAddress
                    ? clientInfo?.employmentdetails[0]?.employer?.emailAddress
                    : "--"}
                  <br />
                </Typography>
              </div>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default ClientInfo;
