import { Grid, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import DataTableList from "../../components/DataTableList";
import { Avatar } from "@mui/material";

//state
import { setShowSpeedDial } from "../../features/checks/checksSlice";
import { useDispatch, useSelector } from "react-redux";
// import PartnerDetails from "../../components/PartnerDetails";
import { getPartnersList } from "../../features/partners/partnerSlice";
//icons

const columns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "logo",
    headerName: "Logo",
    width: 200,
    renderCell: (params) => (
      <>
        <Tooltip title={`${params.row.name}`} placement="top">
          <Avatar
            alt={params.row.name}
            src={params.row.logo}
            sx={{ width: 50, height: 50, objectFit: "fill" }}
          />
        </Tooltip>
      </>
    ),
  },
  { field: "name", headerName: "Company", width: 300 },
  { field: "address", headerName: "Location", width: 300 },
];

const Partners = () => {
  const dispatch = useDispatch();

  // global state values
  const { partners } = useSelector((state) => state.partners);

  useEffect(() => {
    //show speed dial
    dispatch(getPartnersList());
    dispatch(setShowSpeedDial(true));
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ pb: 1, mb: 1 }}>
        <DataTableList
          columns={columns}
          rows={partners}
          tableTitle="Our Partners"
        />
      </Grid>
    </>
  );
};

export default Partners;
