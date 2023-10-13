import { Typography } from "@mui/material";
import React from "react";
import Uploader from "../../components/Uploader";

const UploadProPic = () => {
  return (
    <div>
      <Typography gutterBottom>Upload your profile picture here.</Typography>
      <Uploader style={{ paddingTop: "12px", marginTop: "12px" }} />
    </div>
  );
};

export default UploadProPic;
