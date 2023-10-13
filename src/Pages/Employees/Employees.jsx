import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import Title from "../../components/Title";
import ActionButton from "../../components/ActionButton";

// fake employee data
const employees = [
  {
    no: "1",
    firstName: "John",
    lastName: "Smith",
    empNo: "10002",
    dept: "ITD",
    nhCode: "NH-T",
  },
  {
    no: "2",
    firstName: "Jackson",
    lastName: "Peter",
    empNo: "10003",
    dept: "ITD",
    nhCode: "NH-T",
  },
  {
    no: "3",
    firstName: "Kathryn",
    lastName: "Murphy",
    empNo: "10004",
    dept: "P&C",
    nhCode: "NH-T",
  },
  {
    no: "4",
    firstName: "Kris",
    lastName: "Smith",
    empNo: "10005",
    dept: "AMD",
    nhCode: "NH-T",
  },

  {
    no: "5",
    firstName: "Robert",
    lastName: "Fox",
    empNo: "10006",
    dept: "BPD",
    nhCode: "NH-T",
  },
  {
    no: "6",
    firstName: "Ronald",
    lastName: "Richards",
    empNo: "10007",
    dept: "BPD",
    nhCode: "NH-T",
  },
  {
    no: "7",
    firstName: "Bessie",
    lastName: "Cooper",
    empNo: "10008",
    dept: "P&C",
    nhCode: "NH-T",
  },
  {
    no: "8",
    firstName: "Darlene",
    lastName: "Robertson",
    empNo: "10009",
    dept: "FND",
    nhCode: "NH-T",
  },
  {
    no: "9",
    firstName: "Jerome",
    lastName: "Bell",
    empNo: "10010",
    dept: "RCD",
    nhCode: "NH-T",
  },
  {
    no: "10",
    firstName: "Brian",
    lastName: "Bell",
    empNo: "10011",
    dept: "P&C",
    nhCode: "NH-T",
  },
];

const Employees = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <h2></h2>
        <Title>Employees</Title>
        <Grid
          container
          item
          spacing={2}
          sx={{
            m: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Search Employee"
            variant="standard"
            sx={{ width: "30%", mb: 2 }}
          />
        </Grid>
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Employee No.</TableCell>
                <TableCell>Depart Code</TableCell>
                <TableCell>NH Code</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((e) => (
                <TableRow key={e.no}>
                  <TableCell>{e.no}</TableCell>
                  <TableCell>{e.firstName}</TableCell>
                  <TableCell>{e.lastName}</TableCell>
                  <TableCell>{e.empNo}</TableCell>
                  <TableCell>{e.dept}</TableCell>
                  <TableCell>{e.nhCode}</TableCell>
                  <TableCell>
                    <ActionButton id={e.no} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </Grid>
  );
};

//
export default Employees;
