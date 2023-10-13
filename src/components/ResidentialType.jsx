import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from "react-redux";
import {
  setLot,
  setSection,
  setSuburb,
  setStreet,
  setCity,
  setProvince,
  setProvinces,
  setUnitNo,
  setApartment,
  setSettlement,
  setVillage,
  setDistrict,
  setResType,
  setDistricts,
} from "../features/address/addressSlice";

// axios config
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};
// api
const API = process.env.REACT_APP_API_PROD_URL;

//province and city select
const ProvinceCityPicker = ({ provineInput, cityInput }) => {
  const dispatch = useDispatch();

  const { city, province, provinces } = useSelector((state) => state.address);

  const handleInputChange = (e) => {
    dispatch(setProvince(e.target.value));
    dispatch(setCity(e.target.value));
  };

  return (
    <>
      {provineInput && (
        <>
          <InputLabel id="province" name="province">
            Select Province
          </InputLabel>
          <Select
            labelId="province"
            id="province"
            variant="standard"
            sx={{ minWidth: "100%" }}
            style={{
              padding: "0px",
              margin: "0px",
              paddingBottom: "1px",
            }}
            onChange={handleInputChange}
            value={province}
          >
            {provinces.map((prov) => (
              <MenuItem key={prov.provinceId} value={prov.provinceId}>
                {prov.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      {/* city */}
      {cityInput && (
        <>
          <InputLabel id="city" name="city">
            Select City
          </InputLabel>
          <Select
            labelId="city"
            id="city"
            variant="standard"
            sx={{ minWidth: "100%" }}
            style={{
              padding: "0px",
              margin: "0px",
              paddingBottom: "0px",
            }}
            onChange={handleInputChange}
            value={city}
          >
            {provinces.map((prov) => (
              <MenuItem key={prov.provinceId} value={prov.provinceId}>
                {prov.city}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  );
};

// customer living in village
const Village = () => {
  const dispatch = useDispatch();

  const {
    village,
    district,

    districts,
  } = useSelector((state) => state.address);

  const handleInputChange = (e) => {
    dispatch(setDistrict(e.target.value));
  };

  return (
    <>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="village"
          name="village"
          label="Village Name"
          fullWidth
          autoComplete="village"
          variant="standard"
          value={village}
          onChange={(e) => dispatch(setVillage(e.target.value))}
        />

        {/* <input type="text" id="village" name="village" /> */}
      </Grid>
      <Grid item xs={12} sm={2}>
        <InputLabel id="district" name="district">
          Select district
        </InputLabel>
        <Select
          labelId="district"
          id="district"
          variant="standard"
          sx={{ minWidth: "100%" }}
          style={{
            padding: "0px",
            margin: "0px",
            paddingBottom: "1px",
            marginRight: "100px",
          }}
          onChange={handleInputChange}
          value={district}
        >
          {districts.map((dist) => (
            <MenuItem key={dist.districtId} value={`${dist.districtId}`}>
              <p>{dist.name}</p>
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
};

// customer living in town/city
const TownCity = () => {
  const dispatch = useDispatch();
  // const [resType, setResType] = useState("");

  const { lot, section, suburb, street } = useSelector(
    (state) => state.address
  );

  return (
    <>
      <Grid item xs={12} sm={2}>
        {/* <ResidentialType /> */}
        <TextField
          required
          id="lot"
          name="lot"
          label="Lot Number"
          fullWidth
          autoComplete="lot-number"
          variant="standard"
          value={lot}
          onChange={(e) => dispatch(setLot(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="section"
          name="section"
          label="Section Number"
          fullWidth
          autoComplete="section-number"
          variant="standard"
          value={section}
          onChange={(e) => dispatch(setSection(e.target.value))}
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="suburb"
          name="suburb"
          label="Surburb"
          fullWidth
          autoComplete="suburb-name"
          variant="standard"
          value={suburb}
          onChange={(e) => dispatch(setSuburb(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="street"
          name="street"
          label="Street"
          fullWidth
          autoComplete="street-name"
          variant="standard"
          value={street}
          onChange={(e) => dispatch(setStreet(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <ProvinceCityPicker cityInput={true} />
      </Grid>
    </>
  );
};

// customer living in apartment building
const Apartment = () => {
  const dispatch = useDispatch();
  // const [resType, setResType] = useState("");

  const { street, unitNo, apartmentName } = useSelector(
    (state) => state.address
  );

  return (
    <>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="apartment"
          name="apartment"
          label="Apartment Name"
          fullWidth
          autoComplete="apartment"
          variant="standard"
          value={apartmentName}
          onChange={(e) => dispatch(setApartment(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="apartmentUnit"
          name="apartmentUnit"
          label="Unit Number"
          fullWidth
          autoComplete="apartmentUnit"
          variant="standard"
          value={unitNo}
          onChange={(e) => dispatch(setUnitNo(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="street"
          name="street"
          label="Street"
          fullWidth
          autoComplete="street-name"
          variant="standard"
          value={street}
          onChange={(e) => dispatch(setStreet(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <ProvinceCityPicker cityInput={true} />
      </Grid>
    </>
  );
};

// customer living settlements
const Settlement = () => {
  const dispatch = useDispatch();
  // const [resType, setResType] = useState("");

  const { suburb, settlement } = useSelector((state) => state.address);

  return (
    <>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="settlement"
          name="settlement"
          label="Settlement Name"
          fullWidth
          autoComplete="settlement"
          variant="standard"
          value={settlement}
          onChange={(e) => dispatch(setSettlement(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          required
          id="surburb"
          name="surburb"
          label="Enter Surburb"
          fullWidth
          autoComplete="surburb"
          variant="standard"
          value={suburb}
          onChange={(e) => dispatch(setSuburb(e.target.value))}
        />
      </Grid>
    </>
  );
};

const ResidentialType = () => {
  const dispatch = useDispatch();

  const { province, resType } = useSelector((state) => state.address);

  const handleChange = (e) => {
    dispatch(setResType(e.target.value));
  };

  //api call for province
  const getProvinces = async () => {
    try {
      const { data } = await axios.get(`${API}/provinces`, CONFIG);

      dispatch(setProvinces(data));
    } catch (error) {
      console.error(error);
    }
  };

  // get districts
  const getDistricts = async () => {
    try {
      const { data } = await axios.get(`${API}/districts/${province}`, CONFIG);

      dispatch(setDistricts(data));
    } catch (error) {
      console.error(error);
    }
  };

  // provinces
  useEffect(() => {
    getProvinces();
  }, []);

  //districts
  useEffect(() => {
    getDistricts();
  }, [province]);

  const SelectResidentialType = (type) => {
    switch (type) {
      case "1":
        return <TownCity />;
      case "2":
        return <Apartment />;
      case "3":
        return <Settlement />;
      case "4":
        return <Village />;
      // default case
      default:
        return (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ padding: "15px 0px 0px 15px", color: "red" }}
            >
              <h2>Please select your residence type**</h2>
            </Grid>
          </>
        );
    }
  };

  return (
    <>
      <Grid item xs={12} sm={12} style={{ padding: "15px 0px 0px 15px" }}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ paddingTop: "25px", ml: 1 }}
        >
          Residence Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={resType}
          label="Please select your residence location type "
          onChange={handleChange}
          variant="standard"
          sx={{ minWidth: "100%" }}
          style={{
            padding: "0px",
            margin: "0px",
            paddingBottom: "1px",
            textAlign: "center",
          }}
        >
          <MenuItem value={"1"}>Town/City</MenuItem>
          <MenuItem value={"2"}>Apartment</MenuItem>
          <MenuItem value={"3"}>Settlement</MenuItem>
          <MenuItem value={"4"}>Village</MenuItem>
        </Select>
      </Grid>
      {/* header text */}
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Residential Details
        </Typography>
      </Grid>
      {/* render residential type */}
      {SelectResidentialType(resType)}

      {resType !== "" && (
        <Grid item xs={12} sm={2}>
          <ProvinceCityPicker provineInput={true} />
        </Grid>
      )}
    </>
  );
};

export default ResidentialType;
