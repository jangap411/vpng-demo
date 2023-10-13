import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Grid,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";
import EmployeeDetailsForm from "./EmployeeDetailsForm";
import EmployerForm from "./EmployerForm";
import BankForm from "./BankForm";
import LoanForm from "./LoanForm";
import Review from "./Review";
import AddressForm from "./AddressForm";
import Requirements from "./Requirements";
// state
import { clearAddressState } from "../features/address/addressSlice";
import { clearBankState } from "../features/bank/bankSlice";
import { clearEmployeeState } from "../features/employee/employeeSlice";
import { clearLaonState } from "../features/loan/loanSlice";
import { clearEmployerState } from "../features/employer/employerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAlert,
  setSeverity,
  setMessage,
} from "../features/alert/alertSlice";
import { setActiveStep } from "../features/application/applicationSlice";

const steps = [
  "Prerequisites",
  "Employee Details",
  "Contact Details",
  "Employer Details",
  "Bank Details",
  "Loan Details",
  "Review Application",
];

// constant variables
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-tokn") ? Cookies.get("access-tokn") : null;
const datetime = new Date();
const DATE_CREATED = datetime.toISOString().slice(0, 10);
let USER_ID = null;
let USER_ID_NAME = null;

const ApplicationStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //getting global state variables
  /*const {} = useSelector((state) => state.clients);
  const {} = useSelector((state) => state.user);
  */
  //loan application
  const {
    invoice,
    loanAmount,
    loanPurpose,
    interest,
    totalRepayment,
    installmentAmount,
    repaymentTerm,
  } = useSelector((state) => state.loan);

  // banks
  const { bank, branch, accountName, accountType, accountNumber } = useSelector(
    (state) => state.bank
  );
  //  employer
  const {
    employer,
    position,
    workEmail,
    department,
    workMobileNumber,
    employmentDate,
    workPhoneNumber,
    staffId,
    payOfficer,
    document,
    employerAddress,
  } = useSelector((state) => state.employer);
  //login user
  const { user } = useSelector((state) => state.profile);
  USER_ID = user?.I;
  USER_ID_NAME = user?.u;
  const PARTNER_ID = user?.p;
  //  address
  const {
    lot,
    section,
    surburb,
    province,
    mobileNumber,
    phoneNumber,
    email,
    postalAddress,
    apartmentName,
    unitNo,
    village,
    settlement,
    street,
    city,
    district,
    resType,
  } = useSelector((state) => state.address);
  const { firstName, lastName, gender, maritalStatus, dependents, dob } =
    useSelector((state) => state.employee);

  const { client_Id } = useSelector((state) => state.clients);

  // const [activeStep, setActiveStep] = useState(0);
  const { activeStep, appType, attachmentName } = useSelector(
    (state) => state.application
  );

  const handleNextStep = () => {
    //display error message.
    function dispatchErrorMessage(message) {
      dispatch(setSeverity("error"));
      dispatch(setMessage(message));
      dispatch(setOpenAlert(true));
    }

    //check empty fields
    // employee details check
    if (activeStep === 1) {
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !dependents ||
        !maritalStatus ||
        !dob
      ) {
        return dispatchErrorMessage(
          "Please fill in all the required fields with an asterisk *"
        );
      }
    }

    //address and contact details
    if (activeStep === 2) {
      if (
        !mobileNumber ||
        !phoneNumber ||
        !email ||
        !postalAddress ||
        !resType
      ) {
        return dispatchErrorMessage(
          "Please fill in all the required fields with an asterisk *"
        );
      }

      if (mobileNumber.length < 8 || phoneNumber.length < 8) {
        return dispatchErrorMessage(
          "The phone number must be at least 8 characters"
        );
      }
    }

    // employer details
    if (activeStep === 3) {
      if (
        !employer ||
        !position ||
        !department ||
        !staffId ||
        !payOfficer ||
        !employerAddress ||
        !workMobileNumber
      ) {
        return dispatchErrorMessage(
          "Please fill in all the required fields with an asterisk *"
        );
      }

      if (workMobileNumber.length < 8 || workPhoneNumber.length < 8) {
        return dispatchErrorMessage(
          "The phone number must be at least 8 characters"
        );
      }
    }

    //check bank details
    if (activeStep === 4) {
      if (!accountName || !accountNumber || !accountType || !bank || !branch) {
        return dispatchErrorMessage(
          "Please fill in all the required fields with an asterisk *"
        );
      }
    }

    //check loan details
    if (activeStep === 5) {
      if (!invoice || !loanPurpose) {
        return dispatchErrorMessage(
          "Please fill in all the required fields with an asterisk *"
        );
      }

      if (document.length <= 0) {
        return dispatchErrorMessage(
          "Please upload the neccessary documents in zip folder *"
        );
      }

      if (!appType) {
        return dispatchErrorMessage(
          "Please fill in all the required fields with an asterisk *"
        );
      }
    }

    dispatch(setActiveStep(activeStep + 1));
  };

  const handleStepBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Requirements />;
      case 1:
        return <EmployeeDetailsForm />;
      case 2:
        return <AddressForm />;
      case 3:
        return <EmployerForm />;
      case 4:
        return <BankForm />;
      case 5:
        return <LoanForm />;
      case 6:
        return <Review />;
      default:
        throw new Error("Unknown Step");
    }
  };

  //handle submit application and redirect back to applications
  const handleRedirect = () => {
    setTimeout(() => {
      dispatch(clearAddressState());
      // navigate("/dashboard/applications");
      window.location = "/dashboard/applications";
    }, 6000);
  };

  //creating new application
  const handleCreateAppliction = async () => {
    // create request body

    //contact
    const contacts = {
      emailAddress: email,
      mobile: mobileNumber,
      postalAddress: postalAddress,
      phone: phoneNumber,
    };
    const bankDetails = {
      bank: bank,
      accountType: accountType,
      accountNumber: accountNumber,
      accountName: accountName,
      bank_branches_Id: branch,
    };

    // address req body
    const address = {
      sectionNo: section,
      lotNo: lot,
      surburb: surburb,
      street: street,
      apartmentName: apartmentName,
      unitNo: unitNo,
      city_town: city,
      village: village,
      district: district,
      settlement: settlement,
      province_provinceId: province,
    };

    // clients req body
    const clients = {
      client_Id,
      firstName: firstName,
      lastName: lastName,
      // profilePicture: "url",
      dateOfBirth: dob,
      gender: gender,
      maritalStatus: maritalStatus,
      dependents: dependents,
      occupation: position,
      // password: "",
      department: department,
      lastLoginDate: DATE_CREATED,
      dateCreated: DATE_CREATED,
      user_roles_Id: "2",
      createdBy_Id: USER_ID,
      createdBy_name: USER_ID_NAME,
      partner: PARTNER_ID,
    };

    // employer details req body
    const employerDetails = {
      name: employer,
      companyAddress: employerAddress,
      companyPhone: workPhoneNumber,
      employerEmail: workEmail,
    };

    //employment details body
    const employmentDetails = {
      employmentDate: employmentDate,
      position: position,
      staffId: staffId,
      payMaster: payOfficer,
      employmentStatus_id: 1,
    };

    //application
    const applications = {
      dateReviewed: "",
      submittedBy: USER_ID, //TODO:get user id from session
      partnerId: PARTNER_ID,
      invoiceNumber: invoice,
      purpose: loanPurpose,
      repaymentAmount: totalRepayment,
      term: repaymentTerm,
      comments: "",
      amountApplied: loanAmount,
      installmentAmount: installmentAmount,
      application_status_Id: 1,
      application_types_Id: appType,
      users_Id: USER_ID, //TODO: get user id from session
      aplicationAttachments: attachmentName,
    };

    try {
      // axios config
      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          contentType: "multipart/form-data",
        },
      };

      // api call
      const newApplication = await axios.post(
        `${API}/applications`,
        {
          contacts,
          bankDetails,
          address,
          clients,
          employerDetails,
          employmentDetails,
          applications,
          aplicationAttachments: document,
        },
        config
      );

      dispatch(setActiveStep(0));
      dispatch(clearAddressState());
      dispatch(clearBankState());
      dispatch(clearEmployeeState());
      dispatch(clearLaonState());
      dispatch(clearEmployerState());
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("success"));
      dispatch(setMessage("Application submitted for processing"));
      handleNextStep(); //call next step function
    } catch (err) {
      dispatch(setOpenAlert(true));
      dispatch(setSeverity("error"));
      dispatch(setMessage(`${err.message}`));
    }
  };

  const SubmitBtn = () => {
    return (
      <Button
        variant="contained"
        onClick={handleCreateAppliction}
        sx={{
          mt: 3,
          ml: 1,
        }}
        style={{ backgroundColor: "#f3754c", "&:hover": "#EB3C47" }}
      >
        Submit application
      </Button>
    );
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography component="h2" variant="h5" align="center">
            Loan Application Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                {handleRedirect()}
                <Typography variant="h5" gutterBottom>
                  Thank you for applying.
                </Typography>
                <Typography variant="subtitle1">
                  Your application invoice #{invoice} is being processed. We
                  will notify you when your loan application is approved.
                  &#128578;
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleStepBack}
                      sx={{ mt: 3, ml: 1, color: "#EB3C47" }}
                    >
                      Back
                    </Button>
                  )}
                  {activeStep === 0 ? (
                    <Button
                      variant="contained"
                      onClick={() => navigate(-1)}
                      sx={{
                        mt: 3,
                        ml: 1,
                      }}
                      style={{
                        backgroundColor: "#f3754c",
                        "&:hover": "#EB3C47",
                      }}
                    >
                      Cancel
                    </Button>
                  ) : null}
                  {activeStep === steps.length - 1 ? (
                    // render submit application form button
                    <SubmitBtn />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNextStep}
                      sx={{
                        mt: 3,
                        ml: 1,
                      }}
                      style={{
                        backgroundColor: "#f3754c",
                        "&:hover": "#EB3C47",
                      }}
                    >
                      {activeStep === steps.length - 1
                        ? "Submit Application"
                        : "Next"}
                    </Button>
                  )}
                </Box>
              </>
            )}
          </>
        </Paper>
      </Grid>
    </>
  );
};

export default ApplicationStep;
