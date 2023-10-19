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

import {
  setOpenModal,
  setIsCustomerForm,
  setIsSimForm,
  setIsUserForm,
} from "../../features/contentModal/contentModal";
import { useDispatch, useSelector } from "react-redux";

const API = "http://localhost:5500/api/v1";

const Sims = () => {
  // state
  const dispatch = useDispatch();
  const [sims, setSims] = useState([]);
  const { openModal, isUserForm } = useSelector((state) => state.contentModal);

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

  // handle open moda
  const handleOpenModal = () => {
    dispatch(setOpenModal(!openModal));
    //dispatch(setIsUserForm(!isUserForm));
    dispatch(setIsCustomerForm(false));
    dispatch(setIsSimForm(true));
    dispatch(setIsUserForm(false));
  };

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
            onClick={handleOpenModal}
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
                    <ActionButton id={sim?.idsims} />
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
