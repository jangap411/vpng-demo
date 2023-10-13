import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "@mui/material";
import logo2 from "../FinCorp-Logo-crop.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: "15px" }}
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
        <img src={logo2} alt="Finance Corporation" style={{ width: "12px" }} />
      </Link>
    </Typography>
  );
}

const NotFount = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          404 Page Not Found
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Sorry the resource you are looking for is not available. "}
          {"Please try again later. Thank you"}
        </Typography>
        <Typography variant="body1">
          <Link href="/dashboard">Go to Home</Link>
        </Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          background:
            "linear-gradient(90deg, #E93749 13.71%, rgba(250, 110, 94, 0.996667) 31.71%, rgba(243, 117, 76, 0.99) 98%)",
        }}
      >
        <Container maxWidth="sm" sx={{ color: "#ffff" }}>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default NotFount;
