import React, { useEffect } from "react";
import CONFIG from "../../utils/axiosHeaderConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  setDistricts,
  setProvince,
} from "../../features/settings/settingsSlice.js";
import DataTableList from "../../components/DataTableList.jsx";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../../features/alert/alertSlice.js";

// base api url
const API = process.env.REACT_APP_API_PROD_URL;
// table columns
const columns = [
  { field: "districtId", headerName: "ID", width: 100 },
  { field: "name", headerName: "District", width: 300 },
];

const Districts = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { province, districts } = useSelector((state) => state.settings);

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  // fetch provinces
  const fetchProvince = async () => {
    try {
      const { data } = await axios.get(`${API}/provinces/${id}`, CONFIG);

      dispatch(setProvince(data));
    } catch (error) {
      console.error(error);
      openAlertMsg("error", error.message);
    }
  };

  // fetch districts for the province
  const fetchDistricts = async () => {
    try {
      const { data } = await axios.get(`${API}/districts/${id}`, CONFIG);
      dispatch(setDistricts(data));
    } catch (error) {
      console.error(error);
      openAlertMsg("error", error.message);
    }
  };

  // province
  useEffect(() => {
    fetchProvince();
  }, []);

  // districts
  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <div>
      <h2>{province?.name}</h2>
      <h3>{province?.city}</h3>
      <DataTableList
        columns={columns}
        rows={districts}
        tableTitle="Districts List"
        getRowId={(districts) => districts.districtId}
      />
    </div>
  );
};

export default Districts;
