import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import Title from "../../components/Title";
import ActionButton from "../../components/ActionButton";

// fake departments data
const departments = [
  { id: "1", name: "IT Department", code: "ITD" },
  { id: "2", name: "Asset Management Departmet", code: "AMD" },
  { id: "3", name: "People & Culture Departmet", code: "P&C" },
  { id: "4", name: "Business Partership Department", code: "BPD" },
  { id: "5", name: "Finance Department", code: "FND" },
  { id: "6", name: "Risk & Compliance Department", code: "RCD" },
];

const Departments = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Departments</Title>
        {/* button container */}
        <Grid item>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#f3754c",
              "&:hover": "#EB3C47",
            }}
            sx={{
              mt: 1,
              ml: 1,
            }}
          >
            Add Department
          </Button>
        </Grid>
        {/* table container */}
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Department Code</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept) => (
                <Tooltip title="click to see details" placement="left-start">
                  <TableRow key={dept.id} style={{ cursor: "pointer" }}>
                    <TableCell>{dept.id}</TableCell>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell>{dept.code}</TableCell>
                    <TableCell>
                      <ActionButton id={dept.id} />
                    </TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Departments;
