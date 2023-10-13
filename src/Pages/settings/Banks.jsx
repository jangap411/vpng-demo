import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import DataTableList from "../../components/DataTableList";
import Title from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { setBanks } from "../../features/settings/settingsSlice";

import axios from "axios";
import CONFIG from "../../utils/axiosHeaderConfig";
import SettingsSpeedDial from "./SettingsSpeedDial";

// axios config
const API = process.env.REACT_APP_API_PROD_URL;

// datatable columns
const columns = [
  { field: "Id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Bank", width: 400 },
];

const Banks = () => {
  const dispatch = useDispatch();

  //   state
  const { banks } = useSelector((state) => state.settings);

  // api call
  const getBanks = async () => {
    try {
      const { data } = await axios.get(`${API}/banks`, CONFIG);
      dispatch(setBanks(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      <SettingsSpeedDial />
      <Grid item container spacing={2}>
        <Title>Banks</Title>
        <DataTableList
          columns={columns}
          rows={banks}
          tableTitle="Bank List"
          getRowId={(banks) => banks.Id}
        />
      </Grid>
    </>
  );
};

export default Banks;
