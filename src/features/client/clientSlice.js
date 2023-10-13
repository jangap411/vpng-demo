import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosHeaderConfig";

const userDetails = JSON.parse(localStorage.getItem("u"))
  ? JSON.parse(localStorage.getItem("u"))
  : { I: 0, p: 0, r: 0 };

// get user login details
let { I, p, r } = userDetails; //{ user: { id: 1, partnerId: 2, roleId: 1 } }; //userDetails;

const initialState = {
  clientsList: [],
  clientInfo: {},
  clientApplications: [],
  clientInfo: null,
  isLoading: true,
  errorMsg: "",
  client_Id: "",
  totalClients: 0,
};

//get client list
export const getClientList = createAsyncThunk(
  "clients/getClientList",
  async (name, thunkAPI) => {
    try {
      //api call

      const { data } = await axiosInstance.get(`/clients/partners/${p}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setClientInfo: (state, action) => {
      state.clientInfo = action.payload;
    },

    setClientApplications: (state, action) => {
      state.clientApplications = action.payload;
    },
    setClientInfo: (state, action) => {
      state.clientInfo = action.payload;
    },
    setClientId: (state, { payload }) => {
      state.client_Id = payload;
    },
    setClientInfo: (state, { payload }) => {
      state.clientInfo = payload;
    },
    setClientList: (state, { payload }) => {
      state.clientsList = payload;
    },
  },
  extraReducers: {
    [getClientList.pending]: (state) => {
      state.isLoading = true;
    },
    [getClientList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.clientsList = payload;
      state.totalClients = payload.length;
    },
    [getClientList.pending]: (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setClientInfo,
  setClientApplications,
  setClientId,
  setClientList,
} = clientSlice.actions;

export default clientSlice.reducer;
