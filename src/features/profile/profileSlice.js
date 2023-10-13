import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// get user infor cookie
const userInfo = Cookies.get("access-token")
  ? jwt_decode(Cookies.get("access-token"))
  : null;

//TODO: set user profile details from cookie/localstorage.
const initialState = {
  user: userInfo,
  isSignedIn: false,
  sessionToken: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileName: (state, action) => {
      state.username = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setAccess: (state, action) => {
      state.access = action.payload;
    },
    setCompany: (state, action) => {
      state.access = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const {
  setIsSignedIn,
  setProfileName,
  setType,
  setAccess,
  setCompany,
  setProfile,
  setSessionToken,
  setUser,
} = profileSlice.actions;

export default profileSlice.reducer;
