import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const Title = (props) => {
  return (
    <Typography
      component="h3"
      variant="h6"
      color="#B7B7B7"
      gutterBottom
      sx={{ padding: "16px 8px 8px" }}
    >
      {props.children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
