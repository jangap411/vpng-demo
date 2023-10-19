import { configureStore } from "@reduxjs/toolkit";
// import profileSlice from "./features/profile/profile/profileSlice";
import titleSlice from "./features/header/titleSlice";
import userSlice from "./features/user/userSlice";
import employeeSlice from "./features/employee/employeeSlice";
import addressSlice from "./features/address/addressSlice";
import employerSlice from "./features/employer/employerSlice";
import bankSlice from "./features/bank/bankSlice";
import loanSlice from "./features/loan/loanSlice";
import modalSlice from "./features/modal/modalSlice";
import profileSlice from "./features/profile/profileSlice";
import alertSlice from "./features/alert/alertSlice";
import applicationSlice from "./features/application/applicationSlice";
import notificationSlice from "./features/notification/notificationSlice";
import checksSlice from "./features/checks/checksSlice";
import clientSlice from "./features/client/clientSlice";
import authSlice from "./features/auth/authSlice";
import contentModal from "./features/contentModal/contentModal";
import simSlice from "./features/sim/simSlice";

export const store = configureStore({
  reducer: {
    address: addressSlice,
    alert: alertSlice,
    auth: authSlice,
    application: applicationSlice,
    bank: bankSlice,
    checks: checksSlice,
    title: titleSlice,
    employee: employeeSlice,
    employer: employerSlice,
    loan: loanSlice,
    modal: modalSlice,
    profile: profileSlice,
    user: userSlice,
    notification: notificationSlice,
    clients: clientSlice,
    contentModal: contentModal,
    sim: simSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
