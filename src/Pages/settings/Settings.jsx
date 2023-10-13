import React from "react";
import { Grid, Paper } from "@mui/material";
import Title from "../../components/Title";
import { Routes, Route } from "react-router-dom";
import Sidemenu from "./Sidemenu";
import Profile from "../Profile/Profile";
import Banks from "./Banks";
import Provinces from "./Provinces";
import Dealers from "./Dealers";
import BankBranches from "./BankBranches";
import Districts from "./Districts";
import SettingModal from "../../components/SettingModal";
import GoBack from "../../components/GoBack";

// styles
const parentDivStyle = {
  display: "flex",
  flexDirection: "row",
};

const sideMenuDivStyle = {
  flex: 1,
  padding: 1,
};

const mainDivStyle = {
  flex: 5,
  padding: 3,
  marginLeft: "10px",
  height: "100%",
};

const Settings = () => {
  return (
    <>
      <Grid item container direction="column" xs={12}>
        <Paper
          sx={{ p: 2, display: "flex", height: 850, flexDirection: "column" }}
        >
          <Title>Settings</Title>
          <div style={parentDivStyle}>
            <div style={sideMenuDivStyle}>
              <Sidemenu />
            </div>
            <div style={mainDivStyle}>
              <Grid item xs={12}>
                <SettingModal />
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* <h1>Main div</h1> */}
                  <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/account" element={<Profile />} />
                    <Route path="/banks" element={<Banks />} />
                    <Route path="/banks/:id" element={<BankBranches />} />

                    <Route path="/province" element={<Provinces />} />
                    <Route path="/province/:id" element={<Districts />} />
                    <Route path="/dealers" element={<Dealers />} />
                    {/* <Route path="*" element={<GoBack />} /> */}
                  </Routes>
                </Paper>
              </Grid>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default Settings;
