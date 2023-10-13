import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// api base url
const API = process.env.REACT_APP_API_PROD_URL;

// get access token
const token = Cookies.get("access-token") ? Cookies.get("access-token") : null;

// create initialState
const initialState = {
  partners: [],
  singlePartner: {},
  partnerName: "",
  partnerLogo: "",
  totalPartners: 0,
  partnerContact: "",
  partnerAddress: "",
  isLoading: true,
  errorMessage: "",
};

//make api call
export const getPartnersList = createAsyncThunk(
  "partners/getPartnersList",
  async (name, thunkAPI) => {
    try {
      // make api call
      const { data } = await axios.get(`${API}/partners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// partner slice
const partnerSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setPartnerName: (state, { payload }) => {
      state.partnerName = payload;
    },
    setPartnerLogo: (state, { payload }) => {
      state.partnerLogo = payload;
    },
    setPartnerContact: (state, { payload }) => {
      state.partnerContact = payload;
    },
    setPartnerAddress: (state, { payload }) => {
      state.partnerAddress = payload;
    },
    setSinglePartner: (state, { payload }) => {
      state.singlePartner = payload;
    },
    setPartners: (state, { payload }) => {
      state.partners = payload;
    },
    setTotalPartners: (state, { payload }) => {
      state.totalPartners = payload;
    },
  },
  extraReducers: {
    [getPartnersList.pending]: (state) => {
      state.isLoading = true;
    },
    [getPartnersList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.partners = payload;
      // total number of partners
      state.totalPartners = payload.length;
    },
    [getPartnersList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  setPartnerName,
  setPartnerLogo,
  setPartnerContact,
  setPartnerAddress,
  setSinglePartner,
  setPartners,
  setTotalPartners,
} = partnerSlice.actions;

export default partnerSlice.reducer;
