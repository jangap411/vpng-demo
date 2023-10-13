import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBank,
  setBranch,
  setAccountName,
  setAccountType,
  setAccountNumber,
  setBanks,
  setBranches,
} from "../features/bank/bankSlice";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setProvince, setProvinces } from "../features/address/addressSlice";

const NUMBER_REGEX = /^\d+$/;

// axios config
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};
// api
const API = process.env.REACT_APP_API_PROD_URL;

const BankForm = () => {
  const dispatch = useDispatch();

  const {
    banks,
    bank,
    branch,
    branches,
    accountName,
    accountType,
    accountNumber,
  } = useSelector((state) => state.bank);

  const { firstName, lastName } = useSelector((state) => state.employee);
  const { provinces, province } = useSelector((state) => state.address);

  // get banks
  const getBanks = async () => {
    try {
      const { data } = await axios.get(`${API}/banks`, CONFIG);

      dispatch(setBanks(data));
    } catch (error) {
      console.error(error);
    }
  };

  // get banks
  const getBranches = async () => {
    try {
      const { data } = await axios.get(
        `${API}/branches/${bank}/${province}`,
        CONFIG
      );

      dispatch(setBranches(data));
    } catch (error) {
      console.error(error);
    }
  };

  // get province
  const getProvinces = async () => {
    try {
      const { data } = await axios.get(`${API}/provinces`, CONFIG);

      dispatch(setProvinces(data));
    } catch (error) {
      console.error(error);
    }
  };

  // bank branches list
  useEffect(() => {
    getBranches();
  }, [bank, province]);

  // banks list
  useEffect(() => {
    getBanks();
  }, []);

  // Province list
  useEffect(() => {
    getProvinces();
  }, []);

  const handleChange = (e) => {
    dispatch(setBank(e.target.value));
  };

  const handleBranchChange = (e) => {
    dispatch(setBranch(e.target.value));
  };

  const handleProvinceChange = (e) => {
    dispatch(setProvince(e.target.value));
  };

  const [accountNumberError, setAccountNumberError] = useState(false);
  const handleAccountChange = (e) => {
    setAccountNumberError(!NUMBER_REGEX.test(e.target.value));
    const newNumber = e.target.value.replace(/\D/g, "");
    dispatch(setAccountNumber(newNumber));
  };

  return (
    <>
      <div style={{ padding: "0 2rem" }}>
        <Typography variant="h6" gutterBottom>
          Bank Details
        </Typography>
        <Grid container spacing={3} style={{ marginTop: "15px" }}>
          <Grid
            item
            xs={12}
            sm={3}
            style={{ padding: "15px 0px 0px 15px", marginLeft: "15px" }}
          >
            <InputLabel id="demo-simple-select-label">Bank</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bank}
              label="Gender"
              onChange={handleChange}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
            >
              {banks.map((bank) => (
                <MenuItem key={bank.Id} value={bank.Id}>
                  {bank.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            style={{ padding: "15px 0px 0px 15px", marginLeft: "15px" }}
          >
            <InputLabel id="bank-branches">Select Province</InputLabel>
            <Select
              labelId="bank-branches"
              id="bank-branches"
              value={province}
              label="Gender"
              onChange={handleProvinceChange}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
            >
              {provinces.map((province) => (
                <MenuItem key={province.provinceId} value={province.provinceId}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ padding: "15px 0px 0px 15px", marginLeft: "15px" }}
          >
            <InputLabel id="bank-branches">Bank Branch</InputLabel>
            <Select
              labelId="bank-branches"
              id="bank-branches"
              value={branch}
              label="Gender"
              onChange={handleBranchChange}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
            >
              {branches.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.branch}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="accountName"
              name="accountName"
              label="Account Name"
              fullWidth
              autoComplete="bank-branch"
              variant="standard"
              value={accountName ? accountName : `${firstName} ${lastName}`}
              onChange={(e) => dispatch(setAccountName(e.target.value))}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              required
              id="accountNumber"
              name="accountNumber"
              label="Account Number"
              fullWidth
              autoComplete="account-number"
              variant="standard"
              value={accountNumber}
              onChange={handleAccountChange}
              helperText={
                accountNumberError ? "Please enter numeric values only" : ""
              }
            />
          </Grid>
          <Grid item xs={8} sm={4} style={{ padding: "15px 0px 0px 15px" }}>
            <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={accountType}
              label="Account type"
              onChange={(e) => dispatch(setAccountType(e.target.value))}
              variant="standard"
              sx={{ minWidth: "100%" }}
              style={{
                padding: "0px",
                margin: "0px",
                paddingBottom: "1px",
              }}
              required
            >
              <MenuItem value={"Saving"}>Saving</MenuItem>
              <MenuItem value={"Cheque"}>Cheque</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BankForm;
