import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Slider, Box, Chip } from "@mui/material";
import Title from "./Title";

function valuetext(value) {
  return `${value}°C`;
}

const LoanSlider = () => {
  const [amount, setAmount] = useState(500);
  const [term, setTerm] = useState(5);
  const [interest, setInterest] = useState(1.55);
  const [installments, setInstallments] = useState(0);

  const calcInstallment = (amnt, int, term) => {
    let percentInt = int / 100;
    let installments1 = amnt * percentInt * term;
    let installments2 = installments1 + amnt;
    let instlmnts = installments2 / term;
    setInstallments(instlmnts);
  };

  const handleSetAmount = (e) => {
    setAmount(e.target.value === "" ? "" : Number(e.target.value));
    calcInstallment(amount, interest, term);
  };

  const handleSetTerm = (e) => {
    setTerm(e.target.value === "" ? "" : Number(e.target.value));
    calcInstallment(amount, interest, term);
  };

  //on component load
  useEffect(() => {
    calcInstallment(amount, interest, term);
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Loan Details</Title>
          <Grid container>
            <Grid item container xs={6}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Typography variant="subtitle1">Loan Amount</Typography>
                <Chip
                  variant="outlined"
                  title={`Loan amount PGK${amount}`}
                  label={`PGK ${amount}`}
                />
              </Grid>

              <Box sx={{ width: 380, p: 2 }}>
                <Slider
                  onChange={handleSetAmount}
                  aria-label="loan"
                  defaultValue={500}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={500}
                  max={5000}
                  sx={{ p: 0 }}
                />
              </Box>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography variant="subtitle1">Repayment Term</Typography>
                <Chip
                  variant="outlined"
                  title={`${term} Fortnights`}
                  label={`${term} Fortnights`}
                />
              </Grid>

              <Box sx={{ width: 380, p: 3 }}>
                <Slider
                  onChange={handleSetTerm}
                  aria-label="term"
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={5}
                  max={52}
                />
              </Box>
            </Grid>
            <Grid item container xs={6} sx={{ p: 5 }}>
              <Grid item xs={6} style={{ color: "#cac8c8da" }}>
                <Typography gutterBottom>Loan Amount</Typography>
                <Typography gutterBottom>Repayment Term</Typography>
                <Typography gutterBottom>Interest Rate</Typography>
                <Typography gutterBottom>Installment</Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography gutterBottom>PGK {amount}</Typography>
                  <Typography gutterBottom>{`${term} Fortnights`}</Typography>
                  <Typography gutterBottom>{interest}%</Typography>
                  <Typography gutterBottom>
                    PGK {installments.toFixed(2)}
                  </Typography>
                  <Typography gutterBottom></Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default LoanSlider;
