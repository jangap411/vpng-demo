import React from "react";
import { Grid, Paper } from "@mui/material";
import Title from "../../components/Title";
import CardWidget from "../../components/CardWidget";
// icon
import ArticleIcon from "@mui/icons-material/Article";
const Dashboard = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Dashboard</Title>
        <>
          <CardWidget
            heading="Total Customers"
            icon={<ArticleIcon className="card-icon" />}
            value={1220}
          />
        </>
      </Paper>
    </Grid>
  );
};

export default Dashboard;
