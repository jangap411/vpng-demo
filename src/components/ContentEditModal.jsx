import React from "react";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// state management
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../features/contentModal/contentModal";
// import EditTimesheet from "../Pages/Timesheets/EditTimesheet";

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

const ContentEditModal = () => {
  // state management
  const dispatch = useDispatch();

  const { openModal } = useSelector((state) => state.contentModal);

  //   const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <Modal
        hideBackdrop
        aria-labelledby="edit-content-modal"
        aria-describedby="shows-content-to-be-updated"
        sx={{ boxShadow: 24 }}
        open={openModal}
      >
        <Box sx={{ ...style, width: 900 }}>
          <>
            <IconButton
              aria-label="close"
              style={{
                float: "right",
              }}
              onClick={() => dispatch(setOpenModal(!openModal))}
            >
              <Tooltip title="Close" placement="top">
                <CloseIcon />
              </Tooltip>
            </IconButton>
            {/* Multiple forms to be displayed */}
            {/* TODO: Added logical to render each form dynamically */}
            {/* <EditTimesheet /> */}
            content herer=
          </>
        </Box>
      </Modal>
    </>
  );
};

export default ContentEditModal;
