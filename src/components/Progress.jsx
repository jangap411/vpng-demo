import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Progress = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        Loading. Please wait...
      </Box>
    </>
  );
};

export default Progress;
