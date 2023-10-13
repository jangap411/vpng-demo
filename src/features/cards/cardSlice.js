import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosHeaderConfig";

const user = JSON.parse(localStorage.getItem("p"))
  ? JSON.parse(localStorage.getItem("p"))
  : { I: 0, p: 0, r: 0 };

const initialState = {
  isLoading: true,
  numberOfApplications: null,
  numberOfUsers: [],
  totalApplication: 0,
  approvedApplications: 0,
  declinedApplication: 0,
  pendingApplications: 0,
  totalUsers: 0,
  activeUsers: 0,
  disabledUsers: 0,
  totalAcceptedApplications: 0,
  totalRejectedApplications: 0,
  totalClients: 0,
};

//get total applications
export const getTotalApplications = createAsyncThunk(
  "cards/getTotalApplications",
  async (name, thunkAPI) => {
    try {
      //make api call
      const { data } = await axiosInstance.get(
        `/applications/partners/${user?.p}/users/${user?.I}`
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//get total users
export const getTotalUsers = createAsyncThunk(
  "cards/getTotalUsers",
  async (name, thunkAPI) => {
    try {
      //make api call
      const { data } = await axiosInstance.get(`/partners/${user?.p}/users`);

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// get total clients
export const getTotalClientCount = createAsyncThunk(
  "cards/getTotalClients",
  async (name, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/clients/partners/${user?.p}`);
      console.log(user?.p);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setTotalApplications: (state, action) => {
      state.totalApplication = action.payload;
    },
    setApprovedApplications: (state, action) => {
      state.approvedApplications = action.payload;
    },
    setDeclinedApplications: (state, action) => {
      state.declinedApplication = action.payload;
    },
    setPendingApplications: (state, action) => {
      state.pendingApplications = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    setDisabledUsers: (state, action) => {
      state.disabledUsers = action.payload;
    },

    setTotalRejectApplications: (state, { payload }) => {
      state.totalRejectedApplications = payload;
    },
    setCardStateClear: (state) => {
      state.totalApplication = 0;
      state.approvedApplications = 0;
      state.declinedApplication = 0;
      state.pendingApplications = 0;
      state.totalUsers = 0;
      state.activeUsers = 0;
      state.disabledUsers = 0;
      state.totalAccepted = 0;
      state.totalRejected = 0;
      state.totalClients = 0;
      console.log("\n\n----- clear card state -----\n\n");
    },
  },
  extraReducers: {
    [getTotalApplications.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalApplications.fulfilled]: (state, action) => {
      state.numberOfApplications = action.payload;
      state.totalApplication = action.payload.length;
      //approve
      let approve = action.payload?.filter(
        (apps) => apps.application_status_Id === 2
      );
      state.approvedApplications = approve?.length;
      //pending
      let pending = action.payload?.filter(
        (apps) => apps.application_status_Id === 1
      );
      state.pendingApplications = pending?.length;
      //declined
      let declined = action.payload?.filter(
        (apps) => apps.application_status_Id === 3
      );
      state.declinedApplication = declined?.length;
      //rejected
      let rejected = action.payload?.filter(
        (apps) => apps.application_status_Id === 6
      );
      state.totalRejected = rejected?.length;

      //accepted
      let accpeted = action.payload?.filter(
        (apps) => apps.application_status_Id === 5
      );
      state.totalAccepted = accpeted?.length;
    },
    [getTotalApplications.rejected]: (state) => {
      state.isLoading = false;
    },
    //client
    [getTotalClientCount.pending]: (state) => {
      state.isLoading = true;
    },
    [getTotalClientCount.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.totalClients = payload.length;
    },
    [getTotalClientCount.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.totalClients = payload;
    },
  },
});

export const {
  setTotalApplications,
  setApprovedApplications,
  setDeclinedApplications,
  setPendingApplications,
  setTotalUsers,
  setActiveUsers,
  setDisabledUsers,
  setCardStateClear,
  setTotalRejectApplications,
} = cardSlice.actions;

export default cardSlice.reducer;
