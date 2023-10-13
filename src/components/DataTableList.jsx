import { DataGrid } from "@mui/x-data-grid";
// import { DataGridPro, LicenseInfo } from "@mui/x-data-grid-pro";
import React from "react";
import { Grid, Paper, Button, Tooltip } from "@mui/material";
import Title from "./Title";
import AddItemSpeedDial from "./AddItemSpeedDial";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
//state
import { useSelector } from "react-redux";
import CloseBtn from "./CloseBtn";
// LicenseInfo.setLicenseKey("License here");

const DataTableList = ({ rows, columns, getRowId, tableTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSpeedDial } = useSelector((store) => store.checks);

  const currentPath = location.pathname;

  //handle button click
  const handleActionBtnClick = (id) => {
    navigate(`${currentPath}/${id}`);
  };
  //datatable action column
  const actionCols = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <Tooltip title="View Details" placement="right">
            <Button
              variant="outlined"
              style={{
                color: "#E93749",
                "&:hover": "#EB3C47",
                border: "1px solid #E93749",
              }}
              endIcon={<EditIcon />}
              onClick={(e) => handleActionBtnClick(params.id)}
            >
              View
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid item container direction="column" xs={12}>
        {showSpeedDial && <AddItemSpeedDial />}
        <Paper
          sx={{ p: 2, display: "flex", height: 600, flexDirection: "column" }}
        >
          {showSpeedDial ? null : <CloseBtn />}

          <Title>{tableTitle}</Title>
          <DataGrid
            rows={rows}
            columns={columns.concat(actionCols)}
            getRowId={getRowId}
            pageSize={6}
            rowsPerPageOptions={[6]}
            options={{
              resizableColumns: true,
              editable: true,
              selectableRows: true,
            }}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default DataTableList;
