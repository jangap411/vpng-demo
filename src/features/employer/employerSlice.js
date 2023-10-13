import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employer: "",
  employmentDate: "",
  position: "",
  department: "",
  workPhoneNumber: "",
  workMobileNumber: "",
  workEmail: "",
  staffId: "",
  payOfficer: "",
  document: null,
  employerAddress: "",
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    setEmployer: (state, action) => {
      state.employer = action.payload;
    },
    setEmploymentDate: (state, action) => {
      state.employmentDate = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setWorkPhoneNumber: (state, action) => {
      state.workPhoneNumber = action.payload;
    },
    setWorkMobileNumber: (state, action) => {
      state.workMobileNumber = action.payload;
    },
    setWorkEmail: (state, action) => {
      state.workEmail = action.payload;
    },
    setStaffId: (state, action) => {
      state.staffId = action.payload;
    },
    setEmployerAddress: (state, action) => {
      state.employerAddress = action.payload;
    },
    setDocument: (state, action) => {
      state.document = action.payload;
    },
    setPayOfficer: (state, action) => {
      state.payOfficer = action.payload;
    },
    clearEmployerState: (state) => {
      state.employer = "";
      state.employmentDate = "";
      state.position = "";
      state.department = "";
      state.workPhoneNumber = "";
      state.workMobileNumber = "";
      state.workEmail = "";
      state.staffId = "";
      state.payOfficer = "";
      state.document = null;
      state.employerAddress = "";
    },
  },
});

export const {
  setEmployer,
  setEmploymentDate,
  setPosition,
  setDepartment,
  setWorkPhoneNumber,
  setWorkMobileNumber,
  setWorkEmail,
  setStaffId,
  setEmployerAddress,
  setPayOfficer,
  setDocument,
  clearEmployerState,
} = employerSlice.actions;

export default employerSlice.reducer;
