import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTableList from "../../components/DataTableList.jsx";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../../features/alert/alertSlice.js";
import {
  setBank,
  setBankBranches,
} from "../../features/settings/settingsSlice.js";
import CONFIG from "../../utils/axiosHeaderConfig.js";

// base api url
const API = process.env.REACT_APP_API_PROD_URL;
// table columns
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "bsb", headerName: "BSB #", width: 300 },
  { field: "branch", headerName: "Branch", width: 300 },
];

const BankBranches = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { bank, bankBranches } = useSelector((state) => state.settings);

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  const fetchBank = async () => {
    try {
      // api call

      const { data } = await axios.get(`${API}/banks/${id}`, CONFIG);

      dispatch(setBank(data));
    } catch (error) {
      console.error(error);
      openAlertMsg("error", error.message);

      if (error.response && error.response.data) {
        openAlertMsg(error.response.status, error.response.data);
      }
    }
  };

  // bank branch
  const fetchBankBranches = async () => {
    try {
      // api call

      const { data } = await axios.get(`${API}/banks/branch/${id}`, CONFIG);

      dispatch(setBankBranches(data));
    } catch (error) {
      console.error(error);

      openAlertMsg("error", error.message);

      if (error.response && error.response.data) {
        openAlertMsg(error.response.status, error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);

  useEffect(() => {
    fetchBankBranches();
  }, []);

  return (
    <div>
      <Grid item container spacing={2}></Grid>
      <h2>{bank?.name}</h2>
      <Grid item container spacing={2}>
        {/* <Title>Banks</Title> */}
        <DataTableList
          columns={columns}
          rows={bankBranches}
          tableTitle={`List of ${bank?.name} branches`}
          //   getRowId={(banks) => banks.Id}
        />
      </Grid>
    </div>
  );
};

export default BankBranches;
