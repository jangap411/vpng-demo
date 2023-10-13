import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAlert: false,
  message: "",
  severity: "warning",
  alertMsg: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setOpenAlert: (state, action) => {
      state.openAlert = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
    setOpenAlertMsg: (state, action) => {
      state.alertMsg = action.payload;
    },
  },
});

export const { setOpenAlertMsg, setOpenAlert, setMessage, setSeverity } =
  alertSlice.actions;

export default alertSlice.reducer;
