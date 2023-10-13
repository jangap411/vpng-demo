import React, { useEffect } from "react";
import DataTableList from "../../components/DataTableList";
import { Grid } from "@mui/material";
//state
import { setShowSpeedDial } from "../../features/checks/checksSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClientList } from "../../features/client/clientSlice";
import { axiosInstance } from "../../utils/axiosHeaderConfig";
// import { clientsFake } from "../../fakeData";

// table columns
const columns = [
  { field: "Id", headerName: "ID", width: 80 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 300,
  },
  { field: "lastName", headerName: "Last Name", width: 300 },

  {
    field: "createdBy_name",
    headerName: "Created By",
    width: 300,
  },
];

const Clients = () => {
  const userprofile = JSON.parse(localStorage.getItem("u"));
  const dispatch = useDispatch();

  const { clientsList } = useSelector((store) => store.clients);

  const fetchClientList = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/clients/partners/${userprofile?.p}`
      );

      dispatch(setClientList(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //hide speed dial
    dispatch(setShowSpeedDial(false));
    //get clients
    fetchClientList();
  }, []);

  return (
    <>
      <div></div>
      <Grid item container xs={12}>
        <DataTableList
          columns={columns}
          rows={clientsList}
          tableTitle="Clients List"
          getRowId={(clientsList) => clientsList.Id}
        />
      </Grid>
    </>
  );
};

export default Clients;
