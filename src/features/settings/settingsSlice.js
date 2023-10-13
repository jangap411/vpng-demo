import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  provinces: [],
  province: {},
  bank: {},
  districts: [],
  bankBranches: [],
  banks: [],
  dealers: [],
  profile: {},
  isSettingsModalOpen: false,
  isChangeProPic: false,
  isChangePassword: false,
  aduInfo: false,
  isInfoModalOpen: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setProvinces: (state, { payload }) => {
      state.provinces = payload;
    },
    setProvince: (state, { payload }) => {
      state.province = payload;
    },
    setDistricts: (state, { payload }) => {
      state.districts = payload;
    },
    setBanks: (state, { payload }) => {
      state.banks = payload;
    },
    setBank: (state, { payload }) => {
      state.bank = payload;
    },
    setDealers: (state, { payload }) => {
      state.dealers = payload;
    },
    setBankBranches: (state, { payload }) => {
      state.bankBranches = payload;
    },
    setProfile: (state, { payload }) => {
      state.profile = payload;
    },
    setIsSettingsModalOpen: (state, { payload }) => {
      state.isSettingsModalOpen = payload;
    },
    setIsChangePassword: (state, { payload }) => {
      state.isChangePassword = payload;
    },
    setIsChangeProPic: (state, { payload }) => {
      state.isChangeProPic = payload;
    },
    setAduInfo: (state, { payload }) => {
      state.aduInfo = payload;
    },
    setInfoModalOpen: (state, { payload }) => {
      state.isInfoModalOpen = payload;
    },
  },
});

export const {
  setBanks,
  setBank,
  setProvinces,
  setDealers,
  setDistricts,
  setProvince,
  setBankBranches,
  setProfile,
  setIsSettingsModalOpen,
  setIsChangeProPic,
  setIsChangePassword,
  setAduInfo,
  setInfoModalOpen,
} = settingsSlice.actions;

export default settingsSlice.reducer;
