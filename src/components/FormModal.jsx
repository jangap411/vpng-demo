import React from "react";
import { Box, Modal } from "@mui/material";
// import AddUserForm from "./AddUserForm";
import CreateUserForm from "./CreateUserForm";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddPartner } from "../features/modal/modalSlice";
import AddPartnerForm from "./AddPartnerForm";
import SearchClient from "./SearchClient";
import {
  setNewClient,
  setIsDeclined,
  setIsCdbAmount,
} from "../features/application/applicationSlice";
import CommentInput from "./CommentInput";
import { setClearUserState } from "../features/user/userSlice";
// import CdbCheck from "../Pages/Dashboard/applications/CdbCheck";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-45%, -50%)",
  width: 860,
  bgcolor: "background.paper",
  border: "1px solid grey",
  boxShadow: 24,
  p: 4,
};

const FormModal = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, isAddParnter } = useSelector((state) => state.modal);
  const { newClient, isDeclined, isCdbAmount } = useSelector(
    (store) => store.application
  );
  const handleClose = () => {
    dispatch(closeModal(false));
    dispatch(setIsAddPartner(false));
    dispatch(setNewClient(false));
    dispatch(setIsDeclined(false)); //
    // dispatch(setClearUserState());
    dispatch(setIsCdbAmount(false));
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-modal"
        aria-describedby="form-modal-users"
      >
        <Box sx={style}>
          {isCdbAmount ? (
            <h1>hello</h1>
          ) : (
            <>
              {/* <AddUserForm /> */}
              <>
                {isDeclined ? (
                  <CommentInput />
                ) : newClient ? (
                  <SearchClient />
                ) : (
                  <>{isAddParnter ? <AddPartnerForm /> : <CreateUserForm />}</>
                )}
              </>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FormModal;
