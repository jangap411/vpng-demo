import { SpeedDial, SpeedDialAction } from "@mui/material";
import React, { useState } from "react";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsModal from "../../components/SettingModal";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useNavigate, useLocation } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const SettingsSpeedDial = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    console.log("close");
  };

  const handleOpen = () => {
    console.log("open");
  };

  return (
    <>
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
        onClick={handleOpen}
      >
        <SpeedDialAction
          icon={<AddBusinessIcon />}
          tooltipTitle="New Partner"
          onClick={handleOpen}
        />
      </SpeedDial>
    </>
  );
};

export default SettingsSpeedDial;
