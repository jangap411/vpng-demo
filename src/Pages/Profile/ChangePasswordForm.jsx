import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

const ChangePasswordForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  //   const { isOpen, isAddParnter } = useSelector((state) => state.modal);
  const handleClose = () => {
    // dispatch(closeModal(false));
    // dispatch(setIsAddPartner(false));
    // dispatch(setNewClient(false));
    // dispatch(setIsDeclined(false)); //

    setIsOpen(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-modal"
        aria-describedby="form-modal-users"
      >
        <Box>ChangePasswordForm</Box>
      </Modal>
    </>
  );
};

export default ChangePasswordForm;
