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
// import { setIsUserForm } from "../../features/user/userSlice";
import {
  setOpenModal,
  setIsCustomerForm,
  setIsSimForm,
  setIsUserForm,
} from "../../features/contentModal/contentModal";
import { useDispatch, useSelector } from "react-redux";
import CustomerAutoCompleteSearch from "./CustomerAutoCompleteSearch";

const API = "http://localhost:5500/api/v1";

const Customers = () => {
  const dispatch = useDispatch();
  // state
  const [customers, setCustomers] = useState([]);
  // openning modal
  const { openModal, isUserForm, isSimForm, isCustomerForm } = useSelector(
    (state) => state.contentModal
  );

  // load data
  const loadCustomers = async () => {
    try {
      const { data } = await axios.get(`${API}/customers`);
      console.log(data);
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // on load
  useEffect(() => {
    loadCustomers();
  }, []);

  // open form modal
  const handleOpenModal = () => {
    dispatch(setOpenModal(!openModal));
    dispatch(setIsUserForm(!isUserForm));
    dispatch(setIsCustomerForm(true));
    dispatch(setIsSimForm(false));
    dispatch(setIsUserForm(false));
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Customers</Title>
        <Grid
          item
          sx={{
            m: 1,
            p: 1,
          }}
        >
          <CustomerAutoCompleteSearch />
        </Grid>
        <Grid item>
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
            Add Customer
          </Button>
        </Grid>
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Dob</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>MSISDN</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer?.idcustomer}>
                  <TableCell>{customer?.idcustomer}</TableCell>
                  <TableCell>{customer?.first_name}</TableCell>
                  <TableCell>{customer?.last_name}</TableCell>
                  <TableCell>{customer?.dob}</TableCell>
                  <TableCell>{customer?.gender}</TableCell>
                  <TableCell>{customer?.address}</TableCell>
                  <TableCell>{customer?.msisdn}</TableCell>
                  <TableCell>
                    <ActionButton id={customer?.idcustomer} />
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

export default Customers;
