import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const Sims = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h3">Sims</Typography>
      </Paper>
    </Grid>
  );
};

export default Sims;
