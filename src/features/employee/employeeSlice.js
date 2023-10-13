import { createSlice } from "@reduxjs/toolkit";
// import dayjs from "dayjs";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  maritalStatus: "",
  dependents: "",
  dob: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setGenderName: (state, action) => {
      state.gender = action.payload;
    },
    setMaritalStatus: (state, action) => {
      state.maritalStatus = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setDependents: (state, action) => {
      state.dependents = action.payload;
    },
    clearEmployeeState: (state, action) => {
      state.firstName = "";
      state.lastName = "";
      state.gender = "";
      state.maritalStatus = "";
      state.dependents = "";
      state.dob = "";
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setGenderName,
  setMaritalStatus,
  setDob,
  setDependents,
  clearEmployeeState,
} = employeeSlice.actions;

export default employeeSlice.reducer;
