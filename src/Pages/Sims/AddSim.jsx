import React, { useState } from "react";
import Title from "../../components/Title";
import { Button, Grid, InputLabel, TextField } from "@mui/material";

const AddSim = () => {
  // state
  const [number, setNumber] = useState("");
  const [puk1, setPuk1] = useState("");
  const [puk2, setPuk2] = useState("");
  const [serial, setSerial] = useState("");

  const addNewSim = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <Title>Customer Details</Title>
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
            value={puk1}
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
            value={puk2}
            onChange={(e) => setPuk2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel id="password">Serial Number</InputLabel>
          <TextField
            variant="standard"
            name="password-field"
            type="text"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
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
