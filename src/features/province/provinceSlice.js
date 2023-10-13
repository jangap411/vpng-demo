import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// api base url
const API = process.env.REACT_APP_API_PROD_URL;
const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;

// initialState
const initialState = {
  provinces: null,
  isLoading: true,
  error: "",
};

// make api call
export const getProvinceList = createAsyncThunk(
  "provinces/getProvinceList",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API}/provinces`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const provinceSlice = createSlice({
  name: "provinces",
  initialState,
  extraReducers: {
    [getProvinceList.pending]: (state) => {
      state.isLoading = true;
    },
    [getProvinceList.fulfilled]: (state, { payload }) => {
      state.provinces = payload;
    },
    [getProvinceList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export default provinceSlice.reducer;
