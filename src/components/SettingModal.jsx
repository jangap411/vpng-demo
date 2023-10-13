import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsChangePassword,
  setIsChangeProPic,
  setIsSettingsModalOpen,
} from "../features/settings/settingsSlice";
import UploadProPic from "../Pages/settings/UploadProPic";
import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChangePasswordForm from "../Pages/settings/ChangePasswordForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  transform: "translate(-60%, -65%)",
  width: 900,
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const SettingModal = () => {
  const dispatch = useDispatch();

  const { isSettingsModalOpen, isChangeProPic, isChangePassword } = useSelector(
    (state) => state.settings
  );

  const handleClose = () => {
    dispatch(setIsSettingsModalOpen(false));
    dispatch(setIsChangeProPic(false));
    dispatch(setIsChangePassword(false));
  };

  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={isSettingsModalOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 900 }}>
          <div>
            <IconButton
              aria-label="delete"
              style={{ float: "right", paddingBottom: "12px", mb: "12px" }}
            >
              <Tooltip title="Close" placement="top">
                <CloseIcon onClick={handleClose} />
              </Tooltip>
            </IconButton>
          </div>
          <>
            {isChangeProPic && <UploadProPic />}
            {isChangePassword && <ChangePasswordForm />}
          </>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default SettingModal;
