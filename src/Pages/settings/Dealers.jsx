import { Grid } from "@mui/material";
import React from "react";
import Title from "../../components/Title";

import { useEffect } from "react";
import DataTableList from "../../components/DataTableList";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { setDealers } from "../../features/settings/settingsSlice";

// axios config
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

//table columns
const columns = [
  { field: "external_party_id", headerName: "ID", width: 90 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "description", headerName: "Dealer", width: 480 },
];

const Dealers = () => {
  const dispatch = useDispatch();
  const { dealers } = useSelector((state) => state.settings);

  const fetchDealers = async () => {
    try {
      const { data } = await axios.get(`${API}/dealers`, CONFIG);

      dispatch(setDealers(data));
    } catch (error) {
      console.error(error);
    }
  };

  // load
  useEffect(() => {
    fetchDealers();
  }, []);

  return (
    <Grid item container spacing={2}>
      <Title>Dealers</Title>
      <DataTableList
        columns={columns}
        rows={dealers}
        tableTitle="List of Dealers"
        getRowId={(dealers) => dealers.external_party_id}
      />
    </Grid>
  );
};

export default Dealers;
