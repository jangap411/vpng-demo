import React from "react";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const Page = ({ children }) => {
  // routing
  const navigate = useNavigate();

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tooltip title="Close" placement="right">
              <IconButton
                aria-label="close"
                component="label"
                sx={{
                  float: "right",
                  p: 0,
                  m: 0,
                }}
                onClick={() => navigate(-1)}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid container item direction="column">
            {children}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Page;
