import React, { useEffect } from "react";
import CardWidget from "../../../components/CardWidget";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import NumbersIcon from "@mui/icons-material/Numbers";

import DataTableList from "../../../components/DataTableList";
//state
import { useDispatch, useSelector } from "react-redux";
import {
  setApplications,
  setIsDeclined,
} from "../../../features/application/applicationSlice";
import { setShowSpeedDial } from "../../../features/checks/checksSlice";
import {
  getTotalApplications,
  setApprovedApplications,
  setDeclinedApplications,
  setPendingApplications,
  setTotalApplications,
  setTotalRejectApplications,
} from "../../../features/cards/cardSlice";
import { axiosInstance } from "../../../utils/axiosHeaderConfig";

// table columns
const columns = [
  { field: "Id", headerName: "ID", width: 80 },
  {
    field: "client",
    headerName: "Applicant",
    width: 200,
    renderCell: (params) => (
      <>
        <div style={{ textAlign: "center" }}>
          {/* applicant name */}
          <span style={{ fontWeight: "bold" }}>
            {params.row.client.firstName} {params.row.client.lastName}
          </span>
          <br />
        </div>
      </>
    ),
  },
  {
    field: "application_status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => <div>{params.row.application_status.status}</div>,
  },

  {
    field: "amountApplied",
    headerName: "Amount (PGK)",
    width: 180,
  },
  {
    field: "term",
    headerName: "Term",
    width: 110,
  },

  {
    field: "repaymentAmount",
    headerName: "Repayment (PGK)",
    width: 180,
  },
  {
    field: "users_Id",
    headerName: "Sales Rep",
    width: 100,
    renderCell: (params) => <>{params.row.user.userName}</>,
  },
];

const Applications = () => {
  const loginUser = JSON.parse(localStorage.getItem("u"));
  const dispatch = useDispatch();
  const { applications } = useSelector((store) => store.application);
  const {
    totalApplication,
    approvedApplications,
    pendingApplications,
    declinedApplication,
    totalAcceptedApplications,
    totalRejectedApplications,
  } = useSelector((state) => state.cards);

  // get applications
  const getApplications = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/applications/partners/${loginUser?.p}/users/${loginUser?.I}`
      );

      dispatch(setApplications(data));
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalApplicationNumber = async () => {
    try {
      //make api call
      const { data } = await axiosInstance.get(
        `/applications/partners/${loginUser?.p}/users/${loginUser?.I}`
      );

      console.log(data);

      // total applications
      const totalApplications = data.length;
      //approve
      let approve = data?.filter((apps) => apps.application_status_Id == 2);
      // pending
      let pending = data?.filter((apps) => apps.application_status_Id == 1);
      // rejected
      let rejected = data?.filter((apps) => apps.application_status_Id == 6);
      //decline
      let declined = data?.filter((apps) => apps.application_status_Id == 3);

      dispatch(setTotalApplications(totalApplications));
      dispatch(setApprovedApplications(approve.length));
      dispatch(setPendingApplications(pending.length));
      dispatch(setDeclinedApplications(declined.length));
      dispatch(setTotalRejectApplications(rejected.length));
    } catch (error) {
      console.error(error);
    }
  };

  // fetch numbers details
  const fetchApplicationNumbers = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/applications/numbers/partners/${loginUser?.p}`
      );

      // console.log(data);
      dispatch(setTotalApplications(data.total));
      dispatch(setApprovedApplications(data.approved));
      dispatch(setPendingApplications(data.pending));
      dispatch(setDeclinedApplications(data.declined));
      dispatch(setTotalRejectApplications(data.rejected));
    } catch (error) {
      console.error(error.message);
    }
  };

  //load applications
  useEffect(() => {
    //show speed dial
    dispatch(setShowSpeedDial(true));
    dispatch(getTotalApplications());

    // dispatch(getApplicationsList());
  }, []);

  // get applications list
  useEffect(() => {
    getApplications();
  }, []);

  //cards
  useEffect(() => {
    // getTotalApplicationNumber();
  }, []);

  // cards backend
  useEffect(() => {
    fetchApplicationNumbers();
  }, []);

  return (
    <>
      {/* <ApplicationStep id="application" /> */}
      <CardWidget
        heading="Pending Applications"
        icon={<HourglassTopIcon className="card-icon" />}
        value={pendingApplications}
      />
      <CardWidget
        heading="Rejected Applications"
        icon={<NumbersIcon className="card-icon" />}
        value={totalRejectedApplications}
      />
      <CardWidget
        heading="Approved Applications"
        icon={<DoneAllIcon className="card-icon" />}
        value={approvedApplications}
      />

      <CardWidget
        heading="Declined Applications"
        icon={<ThumbDownAltIcon className="card-icon" />}
        value={declinedApplication}
      />
      <DataTableList
        rows={applications}
        columns={columns}
        getRowId={(applications) => applications.Id}
        tableTitle="Applications List"
      />
    </>
  );
};

export default Applications;
