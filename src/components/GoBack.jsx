import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
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
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Typography>
      </Container>
    </Box>
  );
};

export default GoBack;
