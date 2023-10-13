import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import CONFIG from "../../utils/axiosHeaderConfig";

const API_URL = process.env.REACT_APP_API_PROD_URL;
const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;

console.log("\n\nApplication slice load\n\n");

let userDetails = Cookies.get("access-token")
  ? jwt_decode(token)
  : { user: { I: 1, p: 2, r: 1 } };

console.log(`userDetails`);
console.log(userDetails);
console.log(`userDetails`);

let { I, p, r } = userDetails; //{ user: { id: 1, partnerId: 2, roleId: 1 } }; //userDetails.user;

const initialState = {
  applications: [],
  singleApplication: {},
  isLoading: true,
  isError: false,
  newClient: false,
  errorMessage: "",
  isDeclined: false,
  isApproved: false,
  isAccepted: false,
  isRejected: false,
  activeStep: 0,
  appTypes: [],
  appType: "",
  attachmentName: "",
  isCdbAmount: false,
  applicationId: null,
  reject: false,
  isEncoded: false,
};

//get applications list
export const getApplicationsList = createAsyncThunk(
  "applications/getApplicationsList",
  async (name, thunkAPI) => {
    try {
      //api call
      // `${API_URL}/partners/${partners_Id}/roles/${user_roles_Id}/users/${Id}/applications`
      const { data } = await axios.get(
        `${API_URL}/applications/partners/${p}/users/${I}`,
        CONFIG
      );

      return data;
    } catch (error) {
      return thunkAPI(error.message);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNewClient: (state, action) => {
      state.newClient = action.payload;
    },
    setIsDeclined: (state, action) => {
      state.isDeclined = action.payload;
    },
    setIsApproved: (state, action) => {
      state.isApproved = action.payload;
    },
    setIsAccepted: (state, action) => {
      state.isAccepted = action.payload;
    },
    setIsRejected: (state, action) => {
      state.isRejected = action.payload;
    },

    setSingleApplication: (state, { payload }) => {
      state.singleApplication = payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setAppTypes: (state, action) => {
      state.appTypes = action.payload;
    },
    setAppType: (state, { payload }) => {
      state.appType = payload;
    },
    setAttachmentName: (state, action) => {
      state.attachmentName = action.payload;
    },
    setIsCdbAmount: (state, action) => {
      state.isCdbAmount = action.payload;
    },
    setApplications: (state, { payload }) => {
      state.applications = payload;
    },
    setApplicationId: (state, { payload }) => {
      state.applicationId = payload;
    },
    setReject: (state, { payload }) => {
      state.reject = payload;
    },
    setIsEncoded: (state, { payload }) => {
      state.isEncoded = payload;
    },
  },
  extraReducers: {
    [getApplicationsList.pending]: (state) => {
      state.isLoading = true;
    },
    [getApplicationsList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.applications = payload;
    },
    [getApplicationsList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setErrorMessage,
  setIsLoading,
  setNewClient,
  setIsDeclined,
  setSingleApplication,
  setActiveStep,
  setAppTypes,
  setAppType,
  setAttachmentName,
  setIsApproved,
  setIsAccepted,
  setIsRejected,
  setIsCdbAmount,
  setApplications,
  setApplicationId,
  setIsEncoded,
  setReject,
} = applicationSlice.actions;

export default applicationSlice.reducer;
