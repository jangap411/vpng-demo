import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5500/api/v1";

const AutoCompleteSimSearch = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // fetch customer
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const { data } = await axios.post(`${API}/sims/search`, {
          search: query,
        });
        setResults(data);
        console.log("search", data);
      } catch (error) {
        console.error(error);
      }
    }

    if (query) {
      fetchCustomer();
    } else {
      setQuery([]);
    }
  }, [query]);

  // handle select
  const handleSelectChange = (event, value) => {
    console.log("on handle select change");
    console.log(value.split(" "));
    const customer = value.split(" ");
    navigate(`/sims/${customer[0]}`);
  };

  return (
    <>
      <Autocomplete
        id="search-customer"
        freeSolo
        options={results.map((result) => `${result.idsims} ${result.number}`)}
        renderInput={(params) => (
          <TextField {...params} label="Search Number" variant="standard" />
        )}
        onChange={(e, val) => handleSelectChange(e, val)}
      />
    </>
  );
};

export default AutoCompleteSimSearch;
