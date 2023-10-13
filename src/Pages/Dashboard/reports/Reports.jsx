import React from "react";
import { Grid, Paper } from "@mui/material";
import Chart from "../../../components/Chart";

const Reports = () => {
  return (
    <>
      <h1>Reports</h1>
      <Grid item xs={12}>
        <Paper
          sx={{ p: 2, display: "flex", height: 500, flexDirection: "column" }}
        >
          <Chart />
        </Paper>
      </Grid>
    </>
  );
};

export default Reports;
