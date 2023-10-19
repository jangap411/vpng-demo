import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
// import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_API_PROD_URL;
const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const userDetails = Cookies.get("access-token")
  ? jwt_decode(token)
  : { user: { I: 1, p: 2, r: 1 } };

let { I, p, r } = userDetails; //{ user: { id: 1, partnerId: 2, roleId: 1 } }; //userDetails.user;

const initialState = {
  users: [],
  user: {},
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  branch: "",
  password: "",
  username: "",
  company: "",
  isError: false,
  isSuccess: false,
  isLoading: true,
  errorMessage: "",
  totalUsers: 0,
  activeUsers: 0,
  disableUsers: 0,
  roles: [],
  updateUserInfo: false,
  isUserForm: false,
};

//get the user lists
export const getUserList = createAsyncThunk(
  "users/getUserList",
  async (name, thunkAPI) => {
    try {
      //api call
      const response = await axios.get(`${API_URL}/partners/${p}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.users;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setTotalUsers: (state, { payload }) => {
      state.totalUsers = payload;
    },
    setActiveUsers: (state, { payload }) => {
      state.activeUsers = payload;
    },
    setDisablUsers: (state, { payload }) => {
      state.disableUsers = payload;
    },
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
    setCompany: (state, { payload }) => {
      state.company = payload;
    },
    setRoles: (state, { payload }) => {
      state.roles = payload;
    },
    setUpdateUserInfo: (state, { payload }) => {
      state.updateUserInfo = payload;
    },
    setIsUserForm: (state, { payload }) => {
      state.isUserForm = payload;
    },
    setClearUserState: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.userEmail = "";
      state.password = "";
      state.company = "";
      state.branch = "";

      state.user = {};
      state.updateUserInfo = false;
    },
  },
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      // total users
      state.totalUsers = action.payload.length;
      // action users
      let isActiveUsers = action.payload?.filter((user) => user.isActive === 1);
      state.activeUsers = isActiveUsers.length;
      // disable users
      let isDisableUsers = action.payload?.filter(
        (user) => user.isActive === 0
      );
      state.disableUsers = isDisableUsers.length;
    },
    [getUserList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setRole,
  setPassword,
  setBranch,
  setErrorMessage,
  setIsError,
  setIsLoading,
  setUser,
  setTotalUsers,
  setActiveUsers,
  setDisablUsers,
  setUsername,
  setCompany,
  setRoles,
  setUpdateUserInfo,
  setClearUserState,
  setIsUserForm,
} = userSlice.actions;

export default userSlice.reducer;
