import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";

// let userToken = Cookies.getItem("userToken") ? localStorage.getItem("userToken"): null;
let token = Cookies.get("access-token") ? Cookies.get("access-token") : null;
// API
const API_URL = process.env.REACT_APP_API_PROD_URL;
// cookie expiry time
let expiredDate = new Date(new Date().getTime() + 30 * 60 * 1000); //expires in 30 minutes
//FIXME: complete this function slice

// get user infor cookie
const userInfo = Cookies.get("access-token")
  ? jwt_decode(Cookies.get("access-token"))
  : null;

// const userInfo = jwt_decode(userInfoCookie);

// userAction
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const user = {
        userName,
        password,
      };

      const config = {
        Headers: {
          "Content-Type": `application/json`,
        },
      };
      // API call
      const { data } = await axios.post(
        `${API_URL}/authenticate`,
        user,
        config
      );

      // set user token to localStorage
      localStorage.setItem("userToken", JSON.stringify(data.token));
      // set token to cookie
      Cookies.set("token", data.token, { expires: expiredDate });
      // data
      return data;
    } catch (error) {
      console.log("catch block error");
      console.error(error);

      //   return custom error
      if (error.response && error.reponse.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  token,
  loading: true,
  error: null,
  userInfo: userInfo,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
