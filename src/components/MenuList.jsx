import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/header/headerSlice";

// const dispatch = useDispatch();

export const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <Tooltip title="Dashboard" placement="right">
            <DashboardIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to="/dashboard/applications">
      <ListItemButton>
        <ListItemIcon>
          <Tooltip title="Application" placement="right">
            <ArticleIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Applications" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/users">
      <ListItemButton>
        <ListItemIcon>
          <Tooltip title="Users" placement="right">
            <PeopleIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <Link to="/dashboard/reports">
      <ListItemButton>
        <ListItemIcon>
          <Tooltip title="Reports" placement="right">
            <BarChartIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader
      component="div"
      inset
      sx={{ bgcolor: "inherit", color: "#B7B7B7" }}
    >
      Exit
    </ListSubheader>
    <Link to="/login">
      <ListItemButton>
        <ListItemIcon>
          <Tooltip title="Logout" placement="right">
            <PowerSettingsNewIcon className="icon" />
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
