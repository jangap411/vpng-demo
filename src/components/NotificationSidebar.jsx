import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import { Inbox } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArticleIcon from "@mui/icons-material/Article";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/header/titleSlice";

import { setOpenBar } from "../features/notification/notificationSlice";
const NotificationSidebar = () => {
  const dispatch = useDispatch();

  //   const [open, setOpen, close] = useState(false);

  const { openBar } = useSelector((store) => store.notification);

  const toggleDrawer = () => {
    dispatch(setOpenBar(!openBar));
  };

  return (
    <>
      <Drawer open={openBar} anchor="right" onClose={toggleDrawer}>
        <Box sx={{ pt: 3, mt: 6, width: 260 }} role="presentation">
          <List>
            <Link to="settings">
              <ListItem
                disablePadding
                onClick={(e) => dispatch(setName("settings"))}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Tooltip title="My Profile" placement="top">
                      <AccountBoxIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary="Your Profile" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="John Doe" secondary="New Application" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Kris Smith"
                  secondary="Application Approved"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Elvis Presley"
                  secondary="Application Declined"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NotificationSidebar;
