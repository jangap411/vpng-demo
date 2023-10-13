import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Slider,
  Box,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import axios from "axios";
import Cookies from "js-cookie";
//state
import { useSelector, useDispatch } from "react-redux";
import {
  setLoanAmountApplied,
  setRepaymentAmount,
  setInterest,
  setRepaymentTerm,
  setTotalRepaymentAmount,
  setInstallments,
} from "../features/loan/loanSlice";
import {
  setAppType,
  setAppTypes,
} from "../features/application/applicationSlice";
import { Stack } from "@mui/system";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../features/alert/alertSlice";

const Input = styled(MuiInput)`
  width: 100px;
`;

// axios config
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};
// api
const API = process.env.REACT_APP_API_PROD_URL;

// customer loan
const CustomerLoan = () => {
  const dispatch = useDispatch();
  const {
    loanAmount,
    repaymentAmount,
    repaymentTerm,
    interest,
    totalRepayment,
  } = useSelector((store) => store.loan);
  // const [amount, setAmount] = useState(500);

  //loan Amount
  const handleSliderChangeAmount = (event, newValue) => {
    dispatch(setLoanAmountApplied(newValue));
    calcInstallment(loanAmount, interest, repaymentTerm);
    calcTotalRepayment();
  };

  const handleInputChangeAmount = (event) => {
    dispatch(
      setLoanAmountApplied(
        event.target.value === "" ? "" : Number(event.target.value)
      )
    );
    calcInstallment(loanAmount, interest, repaymentTerm);
    calcTotalRepayment();
  };

  const handleBlurAmount = () => {
    if (loanAmount < 0) {
      dispatch(setLoanAmountApplied(0));
    } else if (loanAmount > 9000) {
      dispatch(setLoanAmountApplied(9000));
    }
  };

  //   repayment term
  const handleSliderChangeTerm = (event, newValue) => {
    // setTerm(newValue);
    dispatch(setRepaymentTerm(newValue));
    calcInstallment(loanAmount, interest, repaymentTerm);
  };

  const handleInputChangeTerm = (event) => {
    dispatch(
      setRepaymentTerm(
        event.target.value === "" ? "" : Number(event.target.value)
      )
    );
    calcInstallment(loanAmount, interest, repaymentTerm);
    calcTotalRepayment();
  };
  const handleBlurTerm = () => {
    if (repaymentTerm < 0) {
      dispatch(setRepaymentTerm(0));
    } else if (repaymentTerm > 52) {
      dispatch(setRepaymentTerm(52));
    }
  };

  //calculate installments
  const calcInstallment = (amnt, int, term) => {
    let percentInt = int / 100;
    let installments1 = amnt * percentInt * term;
    let installments2 = installments1 + amnt;
    let instlmnts = installments2 / term;
    dispatch(setRepaymentAmount(instlmnts));
    dispatch(setInstallments(instlmnts));
  };

  //calculate total repayment amount
  const calcTotalRepayment = () => {
    // ((loanAmount x Rate)x Term) + loanAmount

    let part1 = loanAmount * (interest / 100);
    let part2 = part1 * repaymentTerm;
    let totalRepayAmount = loanAmount + part2;
    dispatch(setTotalRepaymentAmount(totalRepayAmount));
  };

  //on component load
  useEffect(() => {
    if (loanAmount < 0) {
      dispatch(setLoanAmountApplied(0));
    } else if (loanAmount > 9000) {
      dispatch(setLoanAmountApplied(9000));
    }
    calcInstallment(loanAmount, interest, repaymentTerm);
  }, []);
  return (
    <>
      <Stack direction="row" spacing={30}>
        <Typography variant="h6" gutterBottom>
          Customer Loan
        </Typography>

        <Chip variant="outlined" title={`1.00% interest`} label={`1.00%`} />
      </Stack>

      <Box sx={{ width: 450, p: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            p: 3,
            marginBottom: "12px",
          }}
        >
          <Typography id="amount-slider" gutterBottom>
            Loan Amount
          </Typography>
          <Chip
            variant="outlined"
            title={`Loan amount PGK ${loanAmount}`}
            label={`PGK ${loanAmount}`}
          />
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs sx={{ mt: 2 }}>
            <Slider
              value={typeof loanAmount === "number" ? loanAmount : 500}
              onChange={handleSliderChangeAmount}
              aria-labelledby="amount-slider"
              defaultValue={500}
              step={5}
              min={500}
              max={9000}
              marks
            />
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            <Input
              value={loanAmount}
              size="small"
              onChange={handleInputChangeAmount}
              onBlur={handleBlurAmount}
              inputProps={{
                step: 5,
                min: 500,
                max: 9000,
                type: "number",
                "aria-labelledby": "amount-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: 450, mt: 2, p: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            p: 3,
            marginBottom: "12px",
          }}
        >
          <Typography id="term-slider" gutterBottom>
            Repayment Term
          </Typography>
          <Chip
            variant="outlined"
            title={`${repaymentTerm} Fortnights`}
            label={`${repaymentTerm} Fortnights`}
          />
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs sx={{ mt: 2 }}>
            <Slider
              value={typeof repaymentTerm === "number" ? repaymentTerm : 5}
              onChange={handleSliderChangeTerm}
              aria-labelledby="term-slider"
              step={1}
              min={5}
              max={52}
              marks
            />
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            <Input
              value={repaymentTerm}
              size="small"
              onChange={handleInputChangeTerm}
              onBlur={handleBlurTerm}
              inputProps={{
                step: 1,
                min: 5,
                max: 52,
                type: "number",
                "aria-labelledby": "term-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// staff loan
const StaffLoan = () => {
  const dispatch = useDispatch();
  const { loanAmount, repaymentTerm, interest } = useSelector(
    (store) => store.loan
  );
  // const [amount, setAmount] = useState(500);

  //loan Amount
  const handleSliderChangeAmount = (event, newValue) => {
    dispatch(setLoanAmountApplied(newValue));
    calcInstallment(loanAmount, interest, repaymentTerm);
    calcTotalRepayment();
  };

  const handleInputChangeAmount = (event) => {
    dispatch(
      setLoanAmountApplied(
        event.target.value === "" ? "" : Number(event.target.value)
      )
    );
    calcInstallment(loanAmount, interest, repaymentTerm);
    calcTotalRepayment();
  };

  const handleBlurAmount = () => {
    if (loanAmount < 0) {
      dispatch(setLoanAmountApplied(0));
    } else if (loanAmount > 7000) {
      dispatch(setLoanAmountApplied(7000));
    }
  };

  //   repayment term
  const handleSliderChangeTerm = (event, newValue) => {
    // setTerm(newValue);
    dispatch(setRepaymentTerm(newValue));
    calcInstallment(loanAmount, interest, repaymentTerm);
  };

  const handleInputChangeTerm = (event) => {
    dispatch(
      setRepaymentTerm(
        event.target.value === "" ? "" : Number(event.target.value)
      )
    );
    calcInstallment(loanAmount, interest, repaymentTerm);
    calcTotalRepayment();
  };
  const handleBlurTerm = () => {
    if (repaymentTerm < 0) {
      dispatch(setRepaymentTerm(0));
    } else if (repaymentTerm > 52) {
      dispatch(setRepaymentTerm(52));
    }
  };

  //calculate installments
  const calcInstallment = (amnt, int, term) => {
    let percentInt = int / 100;
    let installments1 = amnt * percentInt * term;
    let installments2 = installments1 + amnt;
    let instlmnts = installments2 / term;
    dispatch(setRepaymentAmount(instlmnts));
    dispatch(setInstallments(instlmnts));
  };

  //calculate total repayment amount
  const calcTotalRepayment = () => {
    // ((loanAmount x Rate)x Term) + loanAmount

    let part1 = loanAmount * (interest / 100);
    let part2 = part1 * repaymentTerm;
    let totalRepayAmount = loanAmount + part2;
    dispatch(setTotalRepaymentAmount(totalRepayAmount));
  };

  //on component load
  useEffect(() => {
    if (loanAmount < 0) {
      dispatch(setLoanAmountApplied(0));
    } else if (loanAmount > 7000) {
      dispatch(setLoanAmountApplied(7000));
    }

    calcInstallment(loanAmount, interest, repaymentTerm);
  }, []);
  return (
    <>
      <Stack direction="row" spacing={34}>
        <Typography variant="h6" gutterBottom>
          Staff Loan
        </Typography>

        <Chip variant="outlined" title={`1.25% interest`} label={`1.25%`} />
      </Stack>
      <Box sx={{ width: 450, p: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            p: 3,
            marginBottom: "12px",
          }}
        >
          <Typography id="amount-slider" gutterBottom>
            Loan Amount
          </Typography>
          <Chip
            variant="outlined"
            title={`Loan amount PGK ${loanAmount}`}
            label={`PGK ${loanAmount}`}
          />
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs sx={{ mt: 2 }}>
            <Slider
              value={typeof loanAmount === "number" ? loanAmount : 500}
              onChange={handleSliderChangeAmount}
              aria-labelledby="amount-slider"
              defaultValue={500}
              step={5}
              min={500}
              max={7000}
              marks
            />
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            <Input
              value={loanAmount}
              size="small"
              onChange={handleInputChangeAmount}
              onBlur={handleBlurAmount}
              inputProps={{
                step: 5,
                min: 500,
                max: 7000,
                type: "number",
                "aria-labelledby": "amount-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: 450, mt: 2, p: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            p: 3,
            marginBottom: "12px",
          }}
        >
          <Typography id="term-slider" gutterBottom>
            Repayment Term
          </Typography>
          <Chip
            variant="outlined"
            title={`${repaymentTerm} Fortnights`}
            label={`${repaymentTerm} Fortnights`}
          />
        </div>
        <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs sx={{ mt: 2 }}>
            <Slider
              value={typeof repaymentTerm === "number" ? repaymentTerm : 5}
              onChange={handleSliderChangeTerm}
              aria-labelledby="term-slider"
              step={1}
              min={5}
              max={52}
              marks
            />
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            <Input
              value={repaymentTerm}
              size="small"
              onChange={handleInputChangeTerm}
              onBlur={handleBlurTerm}
              inputProps={{
                step: 1,
                min: 5,
                max: 52,
                type: "number",
                "aria-labelledby": "term-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const LoanSlider = () => {
  const dispatch = useDispatch();

  const {
    loanAmount,
    repaymentAmount,
    repaymentTerm,
    interest,
    totalRepayment,
  } = useSelector((store) => store.loan);

  const { appTypes, appType } = useSelector((store) => store.application);

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  const ProductType = (type) => {
    switch (type) {
      case "1":
        return <CustomerLoan />;
      case "2":
        return <StaffLoan />;
      default:
        return (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ padding: "15px 0px 0px 15px", color: "red" }}
            >
              <h2>Please product type**</h2>
            </Grid>
          </>
        );
    }
  };

  // const [prodType, setProdType] = useState("");
  const selectProduct = (e) => {
    // set product interest rate
    if (e.target.value === "1") {
      dispatch(setInterest(1));
    } else if (e.target.value === "2") {
      dispatch(setInterest(1.25));
    }
    dispatch(setAppType(e.target.value));
  };

  const getApplicationType = async () => {
    try {
      const { data } = await axios.get(`${API}/applicationtype`, CONFIG);
      dispatch(setAppTypes(data));
    } catch (error) {
      console.error(error);
      openAlertMsg("error", error.message);
    }
  };

  // get loan  types list
  useEffect(() => {
    getApplicationType();
  }, []);

  return (
    <>
      <Grid item xs={12}>
        {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}> */}
        {/* <Title>Loan Details</Title> */}
        <Grid container>
          <Grid item container xs={6}>
            <Box sx={{ width: 450, mt: 2, p: 1 }}>
              <InputLabel id="product-type-label">
                Select Product Type
              </InputLabel>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Select
                  variant="standard"
                  sx={{ minWidth: "100%" }}
                  labelId="product-type-label"
                  id="product-type-select"
                  onChange={selectProduct}
                  value={appType}
                >
                  {appTypes.map((appType) => (
                    <MenuItem value={`${appType.Id}`} key={appType.Id}>
                      {appType.type}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Box>
            {/* product type slider */}
            {ProductType(appType)}
          </Grid>
          <Grid item container xs={6} sx={{ p: 5 }}>
            <Alert severity="warning">
              These values are subject to change by FinCorp after submission of
              this application.
            </Alert>
            <Grid item xs={6} style={{ color: "#cac8c8da" }} sx={{ p: 5 }}>
              <Typography gutterBottom sx={{ p: 1 }}>
                Loan Amount
              </Typography>
              <Typography gutterBottom sx={{ p: 1 }}>
                Repayment Term
              </Typography>
              <Typography gutterBottom sx={{ p: 1 }}>
                Interest Rate
              </Typography>
              <Typography gutterBottom sx={{ p: 1 }}>
                Installment
              </Typography>
              <Typography gutterBottom sx={{ p: 1 }}>
                Total Repayment Amount
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 5 }}>
              <div>
                <Typography gutterBottom sx={{ p: 1 }}>
                  PGK {loanAmount}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ p: 1 }}
                >{`${repaymentTerm} Fortnights`}</Typography>
                <Typography gutterBottom sx={{ p: 1 }}>
                  {interest}%
                </Typography>
                <Typography gutterBottom sx={{ p: 1 }}>
                  PGK {repaymentAmount.toFixed(2)}
                </Typography>
                <Typography gutterBottom sx={{ p: 1 }}>
                  PGK {totalRepayment.toFixed(2)}
                </Typography>
                <Typography gutterBottom sx={{ p: 1 }}></Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </Grid>
    </>
  );
};

export default LoanSlider;
