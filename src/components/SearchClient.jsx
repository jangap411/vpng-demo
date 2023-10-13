import React, { useState } from "react";
import { Button, Grid, Typography, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setName } from "../features/header/titleSlice";
import { toggleModal } from "../features/modal/modalSlice";
import Title from "./Title";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SearchExistingClient from "./SearchExistingClient";

const SearchClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newClient, setNewClient] = useState(true);
  const handleNewClient = () => {
    dispatch(setName("Applications"));
    navigate("/dashboard/applications/new");
    dispatch(toggleModal(false));
  };

  const handleExistingClient = () => {
    setNewClient(false);
  };

  return (
    <>
      <Title>Create Application</Title>
      {newClient ? (
        <>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={6}>
              <Tooltip
                title="Add loan application for a new Client"
                placement="top-start"
              >
                <Button
                  onClick={handleNewClient}
                  variant="contained"
                  sx={{
                    mt: 3,
                    ml: 1,
                  }}
                  style={{
                    backgroundColor: "#f3754c",
                    "&:hover": "#EB3C47",
                  }}
                  startIcon={<AddCircleIcon />}
                >
                  New Client
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Tooltip
                title="Add application for an existing client"
                placement="top-start"
              >
                <Button
                  onClick={handleExistingClient}
                  variant="contained"
                  sx={{
                    mt: 3,
                    ml: 1,
                  }}
                  style={{
                    backgroundColor: "#EB3C47",
                    "&:hover": "#EB3C47",
                  }}
                  startIcon={<CreateNewFolderIcon />}
                >
                  Existing Client
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={8}>
              <Typography
                component="h1"
                variant="subtitle1"
                gutterBottom
                sx={{ m: 2 }}
              ></Typography>

              <SearchExistingClient />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default SearchClient;
