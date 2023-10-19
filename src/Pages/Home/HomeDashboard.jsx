import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
// state
import { useSelector } from "react-redux";

// icons
import MenuIcon from "@mui/icons-material/Menu";
import UserAvatar from "../../components/UserAvatar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// image
import logo from "../../logo.svg";
// components
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import AlertMsg from "../../components/AlertMsg";
import Users from "../users/Users";
import Page from "../../components/Page";
import ContentEditModal from "../../components/ContentEditModal";
import AddUser from "../users/AddUser";
import Customers from "../Customers/Customers";
import Sims from "../Sims/Sims";
import Dashboard from "./Dashboard";
import UserDetails from "../users/UserDetails";
import CustomerDetails from "../Customers/CustomerDetails";
import SimDetails from "../Sims/SimDetails";

// header
const drawerWidth = 230;

// header bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background:
    "linear-gradient(90deg, rgba(104,0,0,1) 3%, rgba(193,3,6,1) 100%, rgba(251,131,121,1) 100%)", //"linear-gradient(90deg, #E93749 16.71%, rgba(250, 110, 94, 0.996667) 34.71%, rgba(243, 117, 76, 0.99) 98%)",
  color: "#FFFFFF",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// side menu
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#030000", //"#000000", //"#474849",
    color: "#FFFFFF",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// theme
const mdTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

const open = true;

const HomeDashboard = () => {
  // state
  const [open, setOpen] = useState(true);
  const { title } = useSelector((state) => state.title);
  const { openAlert, message, severity } = useSelector((state) => state.alert);

  // toggle drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Header */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", //keep right padding
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            {/* display user avatar */}
            <UserAvatar />
          </Toolbar>
        </AppBar>
        {/* Side menu bar */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#D9D9D9" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {/* display logo */}
            {open && (
              <img
                src={logo}
                alt="logo"
                style={{ width: "85%", padding: "10px" }}
              />
            )}
            {/* icon button -- side bar*/}
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon className="icon" />
            </IconButton>
          </Toolbar>
          {/* menu list */}
          <List component="nav">
            {/* menu list item */}
            <Sidebar />
          </List>
        </Drawer>
        {/* Main content box */}
        <Box
          component="main"
          sx={{
            backgroundColor: "#D9D9D9",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* display main content */}
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={3}>
              {/* ****popup modals & alerts**** */}
              {/* copyright message */}
              {/* <InfoModal /> */}
              {/* Content edit modal */}
              <ContentEditModal />
              {/* alert notification */}
              {openAlert && <AlertMsg severity={severity} message={message} />}

              {/* ***pages routes*** */}
              <Routes>
                {/* dashboard */}
                <Route path="/" element={<Dashboard />} />
                {/* Timesheets*/}
                <Route path="/sims/*" element={<Sims />} />
                <Route path="/sims/:id" element={<SimDetails />} />
                {/* </Route> */}
                {/* Departments */}
                <Route path="/customers/*" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomerDetails />} />
                {/* Employees */}
                <Route path="/employees/*" element={<Page />} />
                <Route path="/employees/:id" element={<Page />} />

                {/* Users */}
                <Route path="/users/*" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="*" element={<h1>Resource Not Found</h1>} />
              </Routes>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default HomeDashboard;
