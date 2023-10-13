import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import logo from "../../logo1.svg";
import { useSelector } from "react-redux";
import {
  Box,
  Toolbar,
  List,
  Typography,
  IconButton,
  Badge,
  Container,
  Grid,
  Tooltip,
} from "@mui/material";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import HandshakeIcon from "@mui/icons-material/Handshake";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

//components
import Footer from "../../components/Footer";
import CardWidget from "../../components/CardWidget";
import UsersPage from "./users/UsersPage";
import Applications from "./applications/Applications";
import Reports from "./reports/Reports";
import ApplicationStep from "../../components/ApplicationStep";
import Sidebar from "../../components/Sidebar";
import Application from "../../components/Application";
import SingleUser from "../../components/SingleUser";
import MuiDatagrid from "../../components/MuiDatagrid";
import TableItem from "../../components/TableItem";
import AlertMsg from "../../components/AlertMsg";
import Profile from "../Profile/Profile";
import Clients from "../Clients/Clients";
import Partners from "../Partners/Partners";
import NotificationSidebar from "../../components/NotificationSidebar";
import UserAvatar from "../../components/UserAvatar";

//state
import { useDispatch } from "react-redux";
import { setOpenBar } from "../../features/notification/notificationSlice";
import ClientDetails from "../../components/ClientDetails";
import ClientLoanDetails from "../../components/ClientLoanDetails";
import FormModal from "../../components/FormModal";
import PartnerDetails from "../../components/PartnerDetails";
import VerifyToken from "../../components/VerifyToken";
//card details
import {
  getTotalApplications,
  getTotalClientCount,
  setApprovedApplications,
  setDeclinedApplications,
  setPendingApplications,
  setTotalApplications,
  setTotalRejectApplications,
  setTotalUsers,
} from "../../features/cards/cardSlice";
import { getUserList } from "../../features/user/userSlice";
import {
  getPartnersList,
  setTotalPartners,
} from "../../features/partners/partnerSlice";
import { getClientList } from "../../features/client/clientSlice";
import Settings from "../settings/Settings";
import { axiosInstance } from "../../utils/axiosHeaderConfig";
import InfoModal from "../../components/InfoModal";
import GoBack from "../../components/GoBack";

//header
const drawerWidth = 230;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background:
    "linear-gradient(90deg, #E93749 25.12%, rgba(250, 110, 94, 0.996667) 54.98%, rgba(243, 117, 76, 0.99) 98%)", //"linear-gradient(90deg, #E93749 16.71%, rgba(250, 110, 94, 0.996667) 34.71%, rgba(243, 117, 76, 0.99) 98%)",
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

//side menu
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#4B1C31", //"#000000", //"#474849",
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

const mdTheme = createTheme({
  typography: {
    fontFamily: ["Baloo 2", "Roboto", "sans-serif"].join(","),
  },
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("u"))
    ? JSON.parse(localStorage.getItem("u"))
    : { I: 0, p: 0, r: 0 };

  const { title } = useSelector((state) => state.title);
  const { totalApplication, totalClients } = useSelector(
    (state) => state.cards
  );

  const { openAlert, message, severity } = useSelector((state) => state.alert);
  const { openBar } = useSelector((state) => state.notification);
  const [open, setOpen] = useState(true);
  //cards number
  // const { totalUsers } = useSelector((state) => state.user);
  const { totalPartners } = useSelector((state) => state.partners);
  const { totalUsers } = useSelector((state) => state.cards);
  // const { totalClients } = useSelector((state) => state.clients);
  //open sidebar function
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const toggleNotifications = () => {
    dispatch(setOpenBar(!openBar));
  };

  // fetch total users backend
  const apiCallfetchTotalUsers = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/users/numbers/partners/${user?.p}/roles/${user?.r}/user/${user?.I}`
      );

      dispatch(setTotalUsers(data.total));
    } catch (error) {
      console.error(error);
    }
  };

  // fetch user numbers
  useEffect(() => {
    apiCallfetchTotalUsers();
  }, []);

  // fetch numbers application details
  const fetchApplicationNumbers = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/applications/numbers/partners/${user?.p}`
      );

      console.log(data);
      dispatch(setTotalApplications(data.total));
      dispatch(setApprovedApplications(data.approved));
      dispatch(setPendingApplications(data.pending));
      dispatch(setDeclinedApplications(data.declined));
      dispatch(setTotalRejectApplications(data.rejected));
    } catch (error) {
      console.error(error.message);
    }
  };

  // fetch numbers application details
  const fetchPartnersNumber = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/partners/numbers/partners/${user?.p}`
      );

      console.log(data);
      dispatch(setTotalPartners(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  // fetch cards numbers
  const fetchTotalNumberOfApplications = async () => {
    try {
      //make api call
      const { data } = await axiosInstance.get(
        `/applications/partners/${user?.p}/users/${user?.I}`
      );

      let totalapplication = data.length;
      console.log(`\n\n---- data application\n\n`);
      console.log(totalapplication);
      console.log(user?.p);
      console.log(user?.I);
      console.log(`\n\n---- data application\n\n`);
      dispatch(setTotalApplications(totalapplication));
    } catch (error) {
      console.error(error);
    }
  };

  //use effect api call on page load
  useEffect(() => {
    // dispatch(getTotalApplications());
    dispatch(getUserList());
    // dispatch(getPartnersList());
    dispatch(getClientList());
    dispatch(getTotalClientCount());
  }, []);

  // fetch applications
  useEffect(() => {
    fetchTotalNumberOfApplications();
  }, []);

  // fetch card number backend
  useEffect(() => {
    fetchApplicationNumbers();
  }, []);

  // fetch partners number backend
  useEffect(() => {
    fetchPartnersNumber();
  }, []);

  const Dash = () => {
    return (
      <>
        <CardWidget
          heading="Total Applications"
          icon={<ArticleIcon className="card-icon" />}
          value={totalApplication}
        />

        <CardWidget
          heading="Total Users"
          icon={<PeopleIcon className="card-icon" />}
          value={totalUsers}
        />
        <CardWidget
          heading="Total Partners"
          icon={<HandshakeIcon className="card-icon" />}
          value={totalPartners}
        />
        <CardWidget
          heading="Total Clients"
          icon={<RecentActorsIcon className="card-icon" />}
          value={totalClients}
        />

        <TableItem />
      </>
    );
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <VerifyToken>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* Header */}
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
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
              <Tooltip title="Notifications">
                <IconButton color="inherit" onClick={toggleNotifications}>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          {/* Side Menu */}
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
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon className="icon" />
              </IconButton>
            </Toolbar>
            <List component="nav">
              {open && <img src={logo} alt="logo" style={{ width: "85%" }} />}
              {/* side menu  */}
              <Sidebar />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: "#D9D9D9",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            {/* Main content */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* open alert messages for error and success messages */}
                {openAlert && (
                  <AlertMsg severity={severity} message={message} />
                )}
                {/* side bar for notification */}

                <NotificationSidebar />
                {/* open modal */}
                <FormModal />
                {/* information page modal */}
                <InfoModal />

                {/* routing to different pages */}
                <Routes>
                  <Route path="/" element={<Dash />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/users/:id" element={<SingleUser />} />

                  <Route path="/reports" element={<Reports />} />

                  <Route path="/applications" element={<Applications />} />
                  <Route
                    path="/applications/new"
                    element={<ApplicationStep />}
                  />
                  <Route path="/applications/:id" element={<Application />} />
                  {/* </Route> */}
                  {/* Partners */}
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/partners/:id" element={<PartnerDetails />} />

                  {/* Clients */}
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/clients/:id" element={<ClientDetails />} />
                  <Route
                    path="/clients/:id/:id"
                    element={<ClientLoanDetails />}
                  />

                  {/* Profile */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/table" element={<MuiDatagrid />} />

                  {/* settings */}
                  <Route path="/settings/*" element={<Settings />} />

                  {/* 404  */}
                  <Route
                    path="*"
                    element={
                      // <h2>
                      //   Oops! Not Found
                      //   <br />
                      //   Go Back
                      // </h2>
                      <GoBack />
                    }
                  />
                </Routes>
                {/* <AddItemSpeedDial /> */}
              </Grid>
              <Footer sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </VerifyToken>
    </ThemeProvider>
  );
};

export default Dashboard;
