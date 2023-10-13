import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Progress from "./Progress";
import { useParams } from "react-router-dom";
import ClientInfo from "./ClientInfo";
import { axiosInstance } from "../utils/axiosHeaderConfig";

// state
import { useDispatch, useSelector } from "react-redux";
import DataTableList from "./DataTableList";
import {
  setMessage,
  setOpenAlert,
  setSeverity,
} from "../features/alert/alertSlice";
// import { laonHistory } from "../fakeData";

// table columns
const columns = [
  { field: "Id", headerName: "ID", width: 80 },
  {
    field: "dateLodged",
    headerName: "Lodge Date",
    width: 100,
    renderCell: (params) => <>{params.row.dateLodged /*.substring(0, 10)*/}</>,
  },
  { field: "amountApplied", headerName: "Loan Amount (PGK)", width: 200 },
  {
    field: "repaymentAmount",
    headerName: "Repayment",
    width: 150,
    renderCell: (params) => <>{`PGK ${params.row.repaymentAmount}`}</>,
  },
  { field: "term", headerName: "Term", width: 150 },
  {
    field: "comments",
    headerName: "Comment",
    width: 200,
  },
  {
    field: "application_status_Id",
    headerName: "status",
    width: 100,
    renderCell: (params) => (
      <>
        {params.row.application_status_Id === 1 ? "Pending" : null}
        {params.row.application_status_Id === 2 ? "Approved" : null}
        {params.row.application_status_Id === 3 ? "Declined" : null}
        {params.row.application_status_Id === 4 ? "Cancelled" : null}
        {params.row.application_status_Id === 5 ? "Accepted" : null}
        {params.row.application_status_Id === 6 ? "Rejected" : null}
      </>
    ),
  },
];

const ClientDetails = () => {
  const dispatch = useDispatch();

  const [loanHistory, setLoanHistory] = useState([]);
  const { id } = useParams();
  const { isLoading } = useSelector((store) => store.clients);

  const getClientLoanHistory = async () => {
    try {
      //api call
      const { data } = await axiosInstance.get(`/clients/${id}/loan`);

      // const { applications } = data;
      setLoanHistory(data);
    } catch (error) {
      // dispatch;
      dispatch(setSeverity("error"));
      dispatch(setMessage(error.message));

      if (error.response && error.response.data) {
        dispatch(setSeverity(error.response.status));
        dispatch(setMessage(error.response.data));
      }

      dispatch(setOpenAlert(true));
    }
  };

  useEffect(() => {
    getClientLoanHistory();
  }, []);

  return (
    <>
      <Grid item xs={12} sx={{ pb: 1, mb: 1 }}>
        <h3 style={{ marginBottom: "10px", paddingBottom: "10px" }}>
          Client Information
        </h3>
        <ClientInfo />
      </Grid>
      {isLoading ? (
        <Progress />
      ) : (
        <DataTableList
          // rows={clientApplications}
          // rows={rows}
          rows={loanHistory ? loanHistory : []}
          columns={columns}
          tableTitle="Loan Application History"
          getRowId={(loanHistory) => loanHistory.Id}
        />
      )}
    </>
  );
};

export default ClientDetails;
