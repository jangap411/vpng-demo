import React from "react";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import ActionButton from "../../components/ActionButton";
import Title from "../../components/Title";

const API = "http://localhost:5500/api/v1";

const Sims = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Sim Cards</Title>
        <Grid item sx={{ m: 1, p: 1 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#B40205",
              "&:hover": "#790102",
            }}
            sx={{
              mt: 1,
              ml: 1,
              float: "right",
            }}
          >
            Add Sim
          </Button>
        </Grid>
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>PUK 1</TableCell>
                <TableCell>PUK 2</TableCell>
                <TableCell>Serial #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {customers.map((customer) => (
                <TableRow key={customer?.idcustomer}>
                  <TableCell>{customer?.idcustomer}</TableCell>
                  <TableCell>{customer?.first_name}</TableCell>
                  <TableCell>{customer?.last_name}</TableCell>
                  <TableCell>{customer?.dob}</TableCell>
                  <TableCell>{customer?.gender}</TableCell>
                  <TableCell>{customer?.address}</TableCell>
                  <TableCell>{customer?.msisdn}</TableCell>
                  <TableCell>
                    <ActionButton id={customer.id} />
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Sims;
