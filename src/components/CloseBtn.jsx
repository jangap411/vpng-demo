import React from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const CloseBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid item sx={{ p: 0, m: 0 }}>
        <Tooltip title="Close" placement="right">
          <IconButton
            aria-label="close"
            component="label"
            sx={{ float: "right", p: 0, m: 1 }}
            onClick={() => navigate(-1)}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};

export default CloseBtn;
