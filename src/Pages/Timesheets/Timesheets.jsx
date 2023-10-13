import React, { useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import TableContent from "../../components/TableContent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const tableHeading = ["#", "Name", "Card #", "Dept", "Total Hrs", "Action"];
const tableData = [
  { id: "1", name: "Jack", card: 2468, dept: "ITD", hrs: 40.0 },
  { id: "2", name: "John", card: 2469, dept: "ITD", hrs: 38.3 },
  { id: "3", name: "Grace", card: 2450, dept: "ITD", hrs: 39.0 },
  { id: "4", name: "Glenda", card: 2451, dept: "ITD", hrs: 40.0 },
  { id: "5", name: "Simon", card: 2452, dept: "ITD", hrs: 40.0 },
  { id: "6", name: "Rex", card: 2453, dept: "ITD", hrs: 40.0 },
];

const Timesheets = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">Timesheets</Typography>
          {/* date picker container */}
          <Grid container item spacing={2} sx={{ m: 1 }}>
            <Grid item xs={12} sm={3}>
              <InputLabel>Select Department</InputLabel>
              <Select
                labelId="Department"
                id="department-select"
                value={"ITD"}
                label="Gender"
                // onChange={handleChange}
                variant="standard"
                sx={{ minWidth: "100%" }}
                style={{
                  padding: "0px",
                  margin: "0px",
                  paddingBottom: "1px",
                }}
              >
                {/* TODO: to be rendered from DB */}
                <MenuItem value={"ITD"}>ITD</MenuItem>
                <MenuItem value={"AMD"}>AMD</MenuItem>
                <MenuItem value={"HRA"}>HRA</MenuItem>
                <MenuItem value={"BPD"}>BPD</MenuItem>
              </Select>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={3}>
                {/* start date datepicker */}
                <DatePicker
                  inputVariant="standard"
                  disableFuture
                  label="Start Date"
                  views={["year", "month", "day"]}
                  value={startDate}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {/* end date picker */}
                <DatePicker
                  inputVariant="standard"
                  disableFuture
                  label="End Date"
                  views={["year", "month", "day"]}
                  renderInput={(params) => <TextField {...params} />}
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f3754c",
                  "&:hover": "#EB3C47",
                  width: "60%",
                }}
                sx={{
                  mt: 1,
                  ml: 1,
                }}
              >
                Load
              </Button>
            </Grid>
          </Grid>

          {/* table container */}
          <Grid item xs={12}>
            {/* 
              timesheet table 
              TODO: Table data to rendered dynamically from the db
            */}
            <TableContent tableHeading={tableHeading} tableData={tableData} />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Timesheets;
