import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAlertMsg } from "../../features/alert/alertSlice";

const AlertMessage = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const { message, severity, alertMsg } = useSelector((store) => store.alert);

  return (
    <>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Collapse in={alertMsg} sx={{ textAlign: "center", margin: "0 auto" }}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={() => {
                  dispatch(setOpenAlertMsg(false));
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ textAlign: "center", margin: "0 auto" }}
          >
            {message}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default AlertMessage;
