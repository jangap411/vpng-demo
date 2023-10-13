import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import InfoPage from "../Pages/settings/InfoPage";
import {
  setAduInfo,
  setInfoModalOpen,
} from "../features/settings/settingsSlice";

import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputEncode from "./InputEncode";
import { setIsEncoded } from "../features/application/applicationSlice";

const style = {
  position: "absolute",
  top: "40%",
  left: "60%",
  transform: "translate(-62%, -65%)",
  width: 900,
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const InfoModal = () => {
  const dispatch = useDispatch();

  const { isInfoModalOpen } = useSelector((state) => state.settings);
  const { isEncoded } = useSelector((state) => state.application);

  const handleClose = () => {
    dispatch(setInfoModalOpen(false));
    dispatch(setIsEncoded(false));
    dispatch(setAduInfo(false));
  };

  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}

      <Modal
        hideBackdrop
        open={isInfoModalOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ boxShadow: 24 }}
      >
        <Box sx={{ ...style, width: 900 }}>
          <div>
            {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
            <IconButton
              aria-label="delete"
              style={{ float: "right", paddingBottom: "12px", mb: "12px" }}
            >
              <Tooltip title="Close" placement="top">
                <CloseIcon onClick={handleClose} />
              </Tooltip>
            </IconButton>
          </div>
          <>{isEncoded ? <InputEncode /> : <InfoPage />}</>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default InfoModal;
