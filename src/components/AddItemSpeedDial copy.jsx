import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FormModal from "./FormModal";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useNavigate, useLocation } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
//state
// import titleSlice from "../features/header/titleSlice";
import { toggleModal } from "../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/header/titleSlice";
import { setIsAddPartner } from "../features/modal/modalSlice";
import { setNewClient } from "../features/application/applicationSlice";
import { IconButton, Tooltip } from "@mui/material";

const AddItemButton = () => {
  return (
    <IconButton>
      <NoteAddIcon />
    </IconButton>
  );
};

const AddItemSpeedDial = () => {
  //parters array

  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpen } = useSelector((state) => state.modal);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //open modal
  const handleOpenModal = () => {
    // setOpenModal(true); /dashboard/users
    dispatch(setName("Users"));
    navigate("/dashboard/users");
    dispatch(toggleModal(true));
  };

  //add new application
  const newApplication = () => {
    dispatch(setName("Applications"));
    dispatch(setNewClient(true));
    dispatch(toggleModal(true));

    // navigate("/dashboard/applications/new");
  };

  //add new partner
  const newPartner = () => {
    console.log("new partner");
    dispatch(setIsAddPartner(true));
    dispatch(setName("Partners"));
    navigate("/dashboard/partners");
    dispatch(toggleModal(true));
  };

  return (
    <>
      {isOpen && <FormModal />}
      <Box
        sx={{
          transform: "translateZ(0px)",
          flexGrow: 1,
          background: "#F3754C",
        }}
      >
        {/* dashboard */}
        {location.pathname === "/dashboard" ? (
          <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            sx={{
              position: "absolute",
              bottom: -70,
              right: 16,
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            FabProps={{
              sx: {
                bgcolor: "#F3754C",
                "&:hover": {
                  bgcolor: "#E93749",
                },
              },
            }}
            direction="left"
          >
            <SpeedDialAction
              icon={<AddBusinessIcon />}
              tooltipTitle="New Partner"
              onClick={newPartner}
            />
            <SpeedDialAction
              icon={<PersonAddAltIcon />}
              tooltipTitle="Add User"
              onClick={handleOpenModal}
            />

            <SpeedDialAction
              icon={<NoteAddIcon />}
              tooltipTitle="New Application"
              onClick={newApplication}
            />
          </SpeedDial>
        ) : null}
        {/* applications */}
        {location.pathname === "/dashboard/applications" ? (
          <Tooltip title="New Application" placement="right">
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{
                position: "absolute",
                bottom: -70,
                right: 16,
              }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              // onOpen={handleOpen}
              open={open}
              FabProps={{
                sx: {
                  bgcolor: "#F3754C",
                  "&:hover": {
                    bgcolor: "#E93749",
                  },
                },
              }}
              direction="left"
              onClick={newApplication}
            >
              <SpeedDialAction
                icon={<NoteAddIcon />}
                tooltipTitle="New Application"
                onClick={newApplication}
                sx={{ visibility: "hidden" }}
              />
            </SpeedDial>
          </Tooltip>
        ) : // <AddItemButton />
        null}
        {/* users */}
        {location.pathname === "/dashboard/users" ? (
          <Tooltip title="Add new user" placement="right">
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{
                position: "absolute",
                bottom: -70,
                right: 16,
              }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              // onOpen={handleOpen}
              open={open}
              FabProps={{
                sx: {
                  bgcolor: "#F3754C",
                  "&:hover": {
                    bgcolor: "#E93749",
                  },
                },
              }}
              direction="left"
              onClick={handleOpenModal}
            >
              <SpeedDialAction
                icon={<PersonAddAltIcon />}
                tooltipTitle="Add User"
                onClick={handleOpenModal}
                sx={{ visibility: "hidden" }}
              />
            </SpeedDial>
          </Tooltip>
        ) : null}
        {location.pathname === "/dashboard/partners" ? (
          <Tooltip title="Add new user" placement="right">
            <SpeedDial
              ariaLabel="SpeedDial controlled open example"
              sx={{
                position: "absolute",
                bottom: -70,
                right: 16,
              }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              // onOpen={handleOpen}
              open={open}
              FabProps={{
                sx: {
                  bgcolor: "#F3754C",
                  "&:hover": {
                    bgcolor: "#E93749",
                  },
                },
              }}
              direction="left"
              onClick={newPartner}
            >
              <SpeedDialAction
                icon={<AddBusinessIcon />}
                tooltipTitle="New Partner"
                onClick={newPartner}
                sx={{ visibility: "hidden" }}
              />
            </SpeedDial>
          </Tooltip>
        ) : null}
      </Box>
    </>
  );
};

export default AddItemSpeedDial;
