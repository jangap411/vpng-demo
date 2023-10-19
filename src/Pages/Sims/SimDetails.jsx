import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import {
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../../features/alert/alertSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ActionButton from "../../components/ActionButton";

// api
const API = "http://localhost:5500/api/v1";

const SimDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // state
  const [number, setNumber] = useState("");
  const [puk1, setPuk1] = useState("");
  const [puk2, setPuk2] = useState("");
  const [serial, setSerial] = useState("");
  const [customer, setCustomer] = useState(null);
  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
  };

  // load
  const handleLoadSim = async () => {
    try {
      const { data } = await axios.get(`${API}/sims/${id}`);
      setNumber(data?.number);
      setPuk1(data?.puk_1);
      setPuk2(data?.puk_2);
      setSerial(data?.serial_no);
      setCustomer(data?.Customer);
      console.log(data);
      console.log("----");
      console.log(customer);
      console.log("----");
    } catch (error) {
      openAlertMsg("error", error.message);
    }
  };

  useEffect(() => {
    handleLoadSim();
  }, []);

  return (
    <Page>
      <Title>Sim Card Details</Title>
      <Grid item container spacing={2} sx={{ p: 2, m: 1 }}>
        <Grid item xs={12} sm={6}>
          <Typography color="#B7B7B7">MSISDN</Typography>
          <Typography sx={{ p: 1 }}>{number}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="#B7B7B7">PUK 1</Typography>
          <Typography sx={{ p: 1 }}>{puk1}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="#B7B7B7">PUK 2</Typography>
          <Typography sx={{ p: 1 }}>{puk2}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography color="#B7B7B7">SERIAL #</Typography>
          <Typography sx={{ p: 1 }}>{serial}</Typography>
        </Grid>
      </Grid>
      <Grid item sx={{ m: 1, p: 1, width: "90%" }}>
        <Typography variant="p" sx={{ p: 1, mb: 2 }}>
          Sim Card Registered to
        </Typography>
        <Table size="small" sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {users.map((user) => ( */}
            <TableRow key={customer?.idcustomer}>
              <TableCell>{customer?.idcustomer}</TableCell>
              <TableCell>{customer?.first_name}</TableCell>
              <TableCell>{customer?.last_name}</TableCell>
              <TableCell>{customer?.dob}</TableCell>
              <TableCell>{customer?.gender}</TableCell>
              <TableCell>{customer?.address}</TableCell>
              <TableCell>
                <ActionButton id={customer?.idcustomer} />
              </TableCell>
            </TableRow>
            {/* ))}  */}
          </TableBody>
        </Table>
      </Grid>
    </Page>
  );
};

export default SimDetails;
