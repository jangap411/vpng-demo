import React, { useState } from "react";
import Title from "../../components/Title";
import { Button, Grid, InputLabel, TextField } from "@mui/material";
import SearchCustomer from "./SearchCustomer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAlert,
  setMessage,
  setSeverity,
} from "../../features/alert/alertSlice";

const API = "http://localhost:5500/api/v1";

const AddSim = () => {
  // state
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [puk_1, setPuk1] = useState("");
  const [puk_2, setPuk2] = useState("");
  const [serial_no, setSerial] = useState("");
  const { customer_idcustomer } = useSelector((store) => store.sim);

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  const addNewSim = async () => {
    try {
      const sim = await axios.post(`${API}/sims`, {
        number,
        puk_1,
        puk_2,
        serial_no,
        customer_idcustomer,
      });

      if (!sim) {
        openAlertMsg("error", "Error Registering Sim");
      }

      openAlertMsg("success", "Sim Registered.");
    } catch (error) {
      openAlertMsg("error", error.message);
    }
  };

  return (
    <>
      <Title>Enter Sim Details</Title>
      <Grid item container spacing={2} sx={{ p: 2, m: 1 }}>
        <Grid item xs={12} sm={4}>
          <InputLabel id="full-name">Number</InputLabel>
          <TextField
            variant="standard"
            name="user-name-field"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="username">PUK 1</InputLabel>
          <TextField
            variant="standard"
            name="user-name-field"
            type="text"
            value={puk_1}
            onChange={(e) => {
              setPuk1(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="dob">PUK 2</InputLabel>
          <TextField
            variant="standard"
            name="email-field"
            type="text"
            value={puk_2}
            onChange={(e) => setPuk2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="password">Serial Number</InputLabel>
          <TextField
            variant="standard"
            name="password-field"
            type="text"
            value={serial_no}
            onChange={(e) => setSerial(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <InputLabel id="password">Customer Name</InputLabel> */}
          <SearchCustomer />
        </Grid>
      </Grid>
      <Grid item sx={{ m: 1, p: 1, width: "90%" }}>
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
          onClick={addNewSim}
        >
          save
        </Button>
      </Grid>
    </>
  );
};

export default AddSim;
