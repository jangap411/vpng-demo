import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lot: "",
  section: "",
  suburb: "",
  street: "",
  city: "",
  province: "",
  mobileNumber: "",
  phoneNumber: "",
  email: "",
  postalAddress: "",
  apartmentName: "",
  unitNo: "",
  village: "",
  settlement: "",
  district: "",
  provinces: [],
  districts: [],
  resType: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setLot: (state, action) => {
      state.lot = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSuburb: (state, action) => {
      state.suburb = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPostalAddress: (state, action) => {
      state.postalAddress = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setApartment: (state, { payload }) => {
      state.apartmentName = payload;
    },
    setUnitNo: (state, { payload }) => {
      state.unitNo = payload;
    },
    setVillage: (state, { payload }) => {
      state.village = payload;
    },
    setSettlement: (state, { payload }) => {
      state.settlement = payload;
    },
    clearAddressState: (state) => {
      state.lot = "";
      state.section = "";
      state.suburb = "";
      state.street = "";
      state.city = "";
      state.province = "";
      state.mobileNumber = "";
      state.phoneNumber = "";
      state.email = "";
      state.postalAddress = "";
      state.apartmentName = "";
      state.unitNo = "";
      state.village = "";
      state.settlement = "";
      state.district = "";
    },
    setProvinces: (state, { payload }) => {
      state.provinces = payload;
    },
    setDistricts: (state, { payload }) => {
      state.districts = payload;
    },
    setResType: (state, { payload }) => {
      state.resType = payload;
    },
  },
});

export const {
  setLot,
  setSection,
  setSuburb,
  setStreet,
  setCity,
  setProvince,
  setMobileNumber,
  setPhoneNumber,
  setPostalAddress,
  setEmail,
  clearAddressState,
  setApartment,
  setSettlement,
  setUnitNo,
  setVillage,
  setDistrict,
  setProvinces,
  setResType,
  setDistricts,
} = addressSlice.actions;

export default addressSlice.reducer;
