import React, { useState, useEffect } from "react";

import { Autocomplete, TextField } from "@mui/material";
// state
import { setClientId, setClientInfo } from "../features/client/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setFirstName,
  setLastName,
  setGenderName,
  setMaritalStatus,
  setDob,
  setDependents,
} from "../features/employee/employeeSlice"; //employee
import {
  setLot,
  setSection,
  setSuburb,
  setStreet,
  setCity,
  setProvince,
  setMobileNumber,
  setPhoneNumber,
  setPostalAddress,
  setEmail,
  setApartment,
  setSettlement,
  setUnitNo,
  setVillage,
  setDistrict,
} from "../features/address/addressSlice";
import {
  setBank,
  setBranch,
  setAccountName,
  setAccountType,
  setAccountNumber,
} from "../features/bank/bankSlice";
import {
  setEmployer,
  setEmploymentDate,
  setPosition,
  setDepartment,
  setWorkPhoneNumber,
  setWorkMobileNumber,
  setWorkEmail,
  setStaffId,
  setEmployerAddress,
  setPayOfficer,
} from "../features/employer/employerSlice";

import { setName } from "../features/header/titleSlice";
import { toggleModal } from "../features/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { setActiveStep } from "../features/application/applicationSlice";
import { axiosInstance } from "../utils/axiosHeaderConfig";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../features/alert/alertSlice";

const AutocompleteSearch = () => {
  // dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get partner id
  const profile = JSON.parse(localStorage.getItem("u"))
    ? JSON.parse(localStorage.getItem("u"))
    : { p: 0, I: 0, r: 0 };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  // const { clientInfo } = useSelector((state) => state.clients);

  // open alert
  const openAlertMsg = (status, message) => {
    dispatch(setOpenAlert(true));
    dispatch(setSeverity(status));
    dispatch(setMessage(message));
    // dispatch(setIsLoading(false));
  };

  useEffect(() => {
    async function fetchResults() {
      const { data } = await axiosInstance.post(
        `/clients/search/client/partner/${profile?.p}`,
        {
          search: query,
        }
      );

      setResults(data);
    }

    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  //load client information for the applications page
  const loadClientInfo = async (event, value) => {
    // get client id
    let splitVals = value.split(" ");
    const ID = splitVals[0];
    try {
      const { data } = await axiosInstance.get(`/clients/${ID}`);

      dispatch(setClientInfo(data?.client));

      dispatch(setFirstName(data?.client?.firstName));
      dispatch(setLastName(data?.client?.lastName));
      dispatch(setGenderName(data?.client?.gender));
      dispatch(setMaritalStatus(data?.client?.maritalStatus));
      dispatch(setDob(data?.client?.dateOfBirth));
      dispatch(setDependents(data?.client?.dependents));
      dispatch(setClientId(data?.client?.Id));
      // bank details
      dispatch(setBank(data?.client?.bankaccdetail?.bank_branches_Id));
      dispatch(setBranch(data?.client?.bankaccdetail?.bank_branches_Id));
      dispatch(setAccountName(data?.client?.bankaccdetail?.accountName));
      dispatch(setAccountType(data?.client?.bankaccdetail?.accountType));
      dispatch(setAccountNumber(data?.client?.bankaccdetail?.accountNumber));
      // contact
      dispatch(setPhoneNumber(data?.client?.contact?.phone));
      dispatch(setMobileNumber(data?.client?.contact?.mobile));
      dispatch(setPostalAddress(data?.client?.contact?.postalAddress));
      dispatch(setEmail(data?.client?.contact?.emailAddress));
      // address
      dispatch(setApartment(data?.client?.address?.apartmentName));
      dispatch(setSettlement(data?.client?.address?.settlement));
      dispatch(setUnitNo(data?.client?.address?.unitNo));
      dispatch(setVillage(data?.client?.address?.village));
      dispatch(setDistrict(data?.client?.address?.district));
      dispatch(setProvince(data?.client?.address?.province_provinceId));
      dispatch(setStreet(data?.client?.address?.street));
      dispatch(setSuburb(data?.client?.address?.surburb));
      dispatch(setSection(data?.client?.address?.section));
      dispatch(setLot(data?.client?.address?.lotNo));
      dispatch(setCity(data?.client?.address?.city_town));
      //employmentDetails

      dispatch(setEmployer(data?.client?.employmentdetails[0]?.employer?.name));
      dispatch(setEmployer(data?.client?.employmentdetails[0]?.employer?.name));
      dispatch(
        setStaffId(data?.client?.employmentdetails[0]?.setStaffId?.staffId)
      );
      dispatch(
        setEmploymentDate(data?.client?.employmentdetails[0]?.employmentDate)
      );
      dispatch(setPosition(data?.client?.employmentdetails[0]?.position));
      dispatch(
        setDepartment(data?.client?.employmentdetails[0]?.employer?.name)
      );
      dispatch(
        setWorkPhoneNumber(data?.client?.employmentdetails[0]?.employer?.phone)
      );
      dispatch(
        setWorkEmail(data?.client?.employmentdetails[0]?.employer?.emailAddress)
      );
      dispatch(
        setEmployerAddress(
          data?.client?.employmentdetails[0]?.employer?.address
        )
      );
      dispatch(setPayOfficer(data?.client?.employmentdetails[0]?.payMaster));

      redirectToApplicationForm();
    } catch (err) {
      console.error(err);
      openAlertMsg("error", err.message);
    }
  };

  //
  const redirectToApplicationForm = () => {
    dispatch(setName("Applications"));
    dispatch(setActiveStep(5));
    navigate("/dashboard/applications/new");
    dispatch(toggleModal(false));
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={results.map(
          (result) => `${result.Id} ${result.firstName} ${result.lastName}`
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search client"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onChange={(event) => setQuery(event.target.value)}
            variant="standard"
          />
        )}
        onChange={(event, value) => loadClientInfo(event, value)}
      />
    </div>
  );
};

export default AutocompleteSearch;
