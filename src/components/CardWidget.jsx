import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Title from "./Title";

const CardWidget = ({ heading, icon, value }) => {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 140,
            cursor: "pointer",
          }}
        >
          <div>
            <Title>{heading}</Title>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "stretch",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "5px",
                marginTop: "5px",
              }}
            >
              {icon}
              <Typography
                component="p"
                variant="h4"
                style={{ flex: 3, fontSize: "28px" }}
              >
                {value}
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default CardWidget;
