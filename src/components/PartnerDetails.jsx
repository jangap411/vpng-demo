import React, { useEffect } from "react";
import logo from "../bbgroup.png";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CardActions,
  Stack,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseBtn from "./CloseBtn";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

import {
  setPartnerName,
  setPartnerLogo,
  setPartnerContact,
  setPartnerAddress,
  setSinglePartner,
} from "../features/partners/partnerSlice";
import { useDispatch, useSelector } from "react-redux";
import Editable from "./Editable";

// GLOBAL CONST
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;

// axios config
const CONFIG = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    contentType: "application/json",
  },
};

const PartnerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    isLoading,
    singlePartner,
    partnerName,
    partnerLogo,
    partnerContact,
    partnerAddress,
  } = useSelector((state) => state.partners);

  const getPartnerDetais = async () => {
    try {
      const { data } = await axios.get(`${API}/partners/${id}`, CONFIG);

      dispatch(setSinglePartner(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPartnerDetais();
    dispatch(setPartnerName(singlePartner?.name));
    dispatch(setPartnerLogo(singlePartner?.logo));
    dispatch(setPartnerContact(singlePartner?.contactNumber));
    dispatch(setPartnerAddress(singlePartner?.address));
  }); //FIXME: dependency array

  return (
    <>
      <Grid item xs={12} sx={{ pb: 1, mb: 1 }}>
        <Card>
          <CloseBtn />
          <CardMedia
            component="img"
            image={partnerLogo}
            alt="green iguana"
            height="194"
            sx={{ objectFit: "contain", p: 2 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {partnerName}
            </Typography>

            <Stack
              direction="row"
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <div>
                <LocationOnIcon />
              </div>
              <div>
                <Editable initialText={partnerAddress} />
              </div>
              <div>
                <PhoneIcon />{" "}
              </div>
              <div>{partnerContact}</div>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              endIcon={<EditIcon />}
              style={{
                color: "#E93749",
                "&:hover": "#EB3C47",
              }}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default PartnerDetails;
