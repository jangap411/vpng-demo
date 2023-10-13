import { Grid } from "@mui/material";
import React from "react";
import Title from "../../components/Title";

import { setProvinces } from "../../features/settings/settingsSlice";

import { useEffect } from "react";
import DataTableList from "../../components/DataTableList";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

// axios config
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

// table columns
const columns = [
  { field: "provinceId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Province", width: 300 },
  { field: "city", headerName: "Capital", width: 300 },
];

const Provinces = () => {
  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.settings);

  // api
  const fetchProvince = async () => {
    try {
      const { data } = await axios.get(`${API}/provinces`, CONFIG);

      dispatch(setProvinces(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  return (
    <Grid item container spacing={2}>
      <Title>Provinces</Title>
      <DataTableList
        columns={columns}
        rows={provinces}
        tableTitle="List of Provinces"
        getRowId={(provinces) => provinces.provinceId}
      />
    </Grid>
  );
};

export default Provinces;
