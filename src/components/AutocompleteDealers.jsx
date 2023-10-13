import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setEmployer } from "../features/employer/employerSlice";

// axios config
const API = process.env.REACT_APP_API_PROD_URL;
const TOKEN = Cookies.get("access-token") ? Cookies.get("access-token") : null;
const CONFIG = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

const AutocompleteDealers = () => {
  // state
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // onload
  useEffect(() => {
    // api call for dealers
    async function fetchDealers() {
      try {
        const { data } = await axios.post(
          `${API}/dealers/search`,
          { search: query },
          CONFIG
        );

        setResults(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (query) {
      fetchDealers();
    } else {
      setQuery([]);
    }
  }, [query]);

  //   set employer name
  const handleSelectChange = (event, value) => {
    dispatch(setEmployer(value));
  };

  return (
    <div style={{ height: "10%", width: "100%" }}>
      <Autocomplete
        id="search-dealer"
        freeSolo
        options={results.map((result) => `${result.description}`)}
        renderInput={(params) => (
          <TextField {...params} label="Employer" variant="standard" />
        )}
        onChange={(e, val) => handleSelectChange(e, val)}
      />
    </div>
  );
};

export default AutocompleteDealers;
