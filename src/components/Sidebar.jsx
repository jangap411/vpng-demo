import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Divider,
} from "@mui/material";
// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArticleIcon from "@mui/icons-material/Article";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";

import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/header/titleSlice";
import { clearTitle } from "../features/header/titleSlice";
import { ROLES, PARTNERS } from "../utils/checkUserPartnerAndRole";
import { setUserInfo } from "../features/auth/authSlice";
import {
  setIsSignedIn,
  setProfile,
  setUser,
} from "../features/profile/profileSlice";
import { setCardStateClear } from "../features/cards/cardSlice";
import {
  setAduInfo,
  setInfoModalOpen,
  setIsSettingsModalOpen,
} from "../features/settings/settingsSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  //logout
  const handleLogout = () => {
    Cookies.remove("access-token");
    localStorage.removeItem("p");
    localStorage.removeItem("u");
    dispatch(clearTitle());
    dispatch(setUserInfo(null));
    dispatch(setUser(null));
    dispatch(setIsSignedIn(false));
    dispatch(setProfile(null));

    dispatch(setCardStateClear()); //clear card state
    // window.location = "/login";
    navigate("/login");
  };

  let activeStyle = {
    color: "yellow",
  };

  // roles array
  const roles = [ROLES.ADMIN, ROLES.MANAGER];
  const partners = [PARTNERS.FINCORP];

  const ACCESS = roles.includes(user?.r);
  const PARTER_ACCESS = partners.includes(user?.p);

  const handleOpenInfoPage = () => {
    dispatch(setInfoModalOpen(true));
    dispatch(setAduInfo(true));
  };

  return (
    <>
      <NavLink to="/">
        <ListItemButton onClick={() => dispatch(setName("Dashboard"))}>
          <ListItemIcon>
            <Tooltip title="Dashboard" placement="right">
              <DashboardIcon className="icon" />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </NavLink>
      <NavLink to="/sims">
        <ListItemButton onClick={() => dispatch(setName("Sim Registration"))}>
          <ListItemIcon>
            <Tooltip title="Sim Registration" placement="right">
              <ArticleIcon className="icon" />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Time sheets" />
        </ListItemButton>
      </NavLink>
      <NavLink to="customers">
        <ListItemButton onClick={() => dispatch(setName("Customers"))}>
          <ListItemIcon>
            <Tooltip title="Customers" placement="right">
              <RecentActorsIcon className="icon" />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
      </NavLink>
      <>
        <NavLink to="/users">
          <ListItemButton onClick={() => dispatch(setName("Users"))}>
            <ListItemIcon>
              <Tooltip title="Users" placement="right">
                <PeopleIcon className="icon" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </NavLink>
        <NavLink to="reports">
          <ListItemButton onClick={() => dispatch(setName("Reports"))}>
            <ListItemIcon>
              <Tooltip title="Reports" placement="right">
                <BarChartIcon className="icon" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </NavLink>
      </>

      <Divider />
      <ListSubheader
        component="div"
        inset
        sx={{ bgcolor: "inherit", color: "#B7B7B7", height: "5px" }}
      ></ListSubheader>
      <NavLink to="settings">
        <ListItemButton onClick={() => dispatch(setName("Settings"))}>
          <ListItemIcon>
            <Tooltip title="Settings" placement="right">
              <SettingsIcon className="icon" />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </NavLink>
      {/* <Link to="/login"> */}
      {/* 
          sx={{ position: "fixed", left: 0, bottom: 0, pt: "15px" }}
          <div style={{ position: "fixed", left: 0, bottom: 0, pt: "15px" }}>
      </div>
        */}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <Tooltip title="Logout" placement="right">
            <PowerSettingsNewIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      <ListItemButton
        onClick={handleOpenInfoPage}
        sx={{ position: "fixed", left: 0, bottom: 0, pt: "15px" }}
      >
        <ListItemIcon>
          <Tooltip title="Information" placement="right">
            <InfoIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="" />
      </ListItemButton>
      {/* </Link> */}
    </>
  );
};

export default Sidebar;
