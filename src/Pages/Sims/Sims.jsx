import React, { useState, useEffect } from "react";
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
  // state
  const [sims, setSims] = useState([]);

  // load data
  const loadSims = async () => {
    try {
      const { data } = await axios.get(`${API}/sims`);
      console.log(data);

      setSims(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSims();
  }, []);

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
              {sims.map((sim) => (
                <TableRow key={sim?.idsims}>
                  <TableCell>{sim?.idsims}</TableCell>
                  <TableCell>{sim?.number}</TableCell>
                  <TableCell>{sim?.puk_1}</TableCell>
                  <TableCell>{sim?.puk_2}</TableCell>
                  <TableCell>{sim?.serial_no}</TableCell>
                  <TableCell>{sim?.customer_idcustomer}</TableCell>
                  <TableCell>
                    <ActionButton id={sim?.id} />
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

export default Sims;
