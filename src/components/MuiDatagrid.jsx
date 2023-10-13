import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Grid, Paper } from "@mui/material";
import AddItemSpeedDial from "./AddItemSpeedDial";
import CardWidget from "./CardWidget";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useSelector, useDispatch } from "react-redux";
import { getUserList } from "../features/user/userSlice";
//fake
const columns = [
  {
    name: "userId",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "userName",
    label: "Username",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "userRole",
    label: "Role",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "branch",
    label: "Branch",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "deleted",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "lastLoginDate",
    label: "Last Login",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "dateCreated",
    label: "Created Date",
    options: {
      filter: true,
      sort: true,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 100],
    },
  },
];

let data = [];

const options = {
  resizableColumns: true,
  filter: false,
  filterType: "dropdown",
};

const MuiDatagrid = () => {
  const { users } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList());
    console.log(users);

    // const propertyValues = Object.values(users);
    console.log("------------------");
    // users.map((user) => data.push(Object.values(user)));
    // // users.map((user) => data.push(user));
    // console.log("-------data-------");
    // console.log(data);
    // console.log("-------data-------");
  }, []);

  return (
    <>
      <CardWidget heading="Hello" value={"Test"} icon={<AcUnitIcon />} />
      <CardWidget heading="Hello" value={"Test"} icon={<AcUnitIcon />} />
      <CardWidget heading="Hello" value={"Test"} icon={<AcUnitIcon />} />
      <CardWidget heading="Hello" value={"Test"} icon={<AcUnitIcon />} />

      <Grid item xs={12}>
        <Paper>
          <MUIDataTable
            title={"Users List"}
            data={users}
            columns={columns}
            options={options}
            style={{ overflow: "hidden" }}
          />
          <AddItemSpeedDial />
        </Paper>
      </Grid>
    </>
  );
};

export default MuiDatagrid;
