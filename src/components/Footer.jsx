import React from "react";
import logo2 from "../FinCorp-Logo-crop.png";
import { Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "45%",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        pt: "15px",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ position: "absolue", left: 0, bottom: 0, p: "8px" }}
      >
        {"Copyright © "}
        {new Date().getFullYear()}{" "}
        <Link
          color="inherit"
          href="https://www.fincorp.com.pg/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Finance Corporation Ltd.{" "}
          <img
            src={logo2}
            alt="Finance Corporation"
            style={{ width: "12px" }}
          />
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
