import React, { useEffect, useState } from "react";
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
import ActionButton from "../../components/ActionButton";
import axios from "axios";
import Title from "../../components/Title";
import AddItemSpeedDial from "../../components/AddItemSpeedDial";
import { setOpenModal } from "../../features/contentModal/contentModal";
import { useDispatch, useSelector } from "react-redux";

// API
const API_BASE_URI = `http://localhost:5500/api/v1`; //process.env.REACT_APP_API_URL;

const Users = () => {
  // state
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { openModal } = useSelector((state) => state.contentModal);
  // load data
  const loadUser = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URI}/users`);
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Users</Title>
        {/* add user button */}
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
            onClick={() => dispatch(setOpenModal(!openModal))}
          >
            Add User
          </Button>
        </Grid>

        {/* users table */}
        <Grid item>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user?.iduser}>
                  <TableCell>{user?.iduser}</TableCell>
                  <TableCell>{user?.full_name}</TableCell>
                  <TableCell>{user?.username}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    <ActionButton id={user?.iduser} />
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
