import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import ActionButton from "../../components/ActionButton";

// fake user data
const users = [
  { id: "1", name: "Jackson", access: "admin" },
  { id: "2", name: "Jackson", access: "ITD" },
  { id: "3", name: "Jackson", access: "HRA" },
  { id: "4", name: "Jackson", access: "AMD" },
  { id: "5", name: "Jackson", access: "BPD" },
  { id: "6", name: "Jackson", access: "OSG" },
];

const Users = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <h2>Users</h2>
        {/* add user button */}
        <Grid item></Grid>

        {/* users table */}
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Access</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.access}</TableCell>
                  <TableCell>
                    <ActionButton id={user.id} />
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

export default Users;
