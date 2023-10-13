import React, { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FormModal from "./FormModal";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useNavigate } from "react-router-dom";
//state
// import titleSlice from "../features/header/titleSlice";
import { toggleModal } from "../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/header/titleSlice";

const AddApplicationSpeedDial = () => {
  const dispatch = useDispatch();
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

  const newApplication = () => {
    dispatch(setName("Applications"));
    navigate("/dashboard/applications/new");
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
        >
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
      </Box>
    </>
  );
};

export default AddApplicationSpeedDial;
