import React, { useEffect } from "react";
import CardWidget from "../../../components/CardWidget";
import DataTableList from "../../../components/DataTableList";
import Progress from "../../../components/Progress";
//icons
import NumbersIcon from "@mui/icons-material/Numbers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonOffIcon from "@mui/icons-material/PersonOff";
//state
import {
  getUserList,
  // setActiveUsers,
  // setDisablUsers,
} from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setShowSpeedDial } from "../../../features/checks/checksSlice";
import { useState } from "react";
import { fakeUsers } from "../../../fakeData";
import {
  getTotalUsers,
  setTotalUsers,
  setActiveUsers,
  setDisabledUsers,
} from "../../../features/cards/cardSlice";
import { axiosInstance } from "../../../utils/axiosHeaderConfig";

// count variables
let activeUsers = [];
let inactiveUsers = [];

const columns = [
  { field: "Id", headerName: "ID", width: 90 },
  { field: "userName", headerName: "Username", width: 180 },
  {
    field: "partner",
    headerName: "Company",
    width: 180,
    renderCell: (params) => (
      <>
        {params.row?.partner?.name}
        {/* {console.log(params)} */}
      </>
    ),
  },
  {
    field: "branch",
    headerName: "Branch",
    width: 180,
    renderCell: (params) => (
      <>
        {params.row?.partner?.address}
        {/* {console.log(params)} */}
      </>
    ),
  },
  {
    field: "isActive",
    headerName: "Status",
    width: 100,
    renderCell: (params) => (
      <>
        {/* check if user is active or not */}
        {params.row.isActive === 1 ? (
          <span
            style={{
              // border: "1px solid #00800065",
              color: "green",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Active
          </span>
        ) : (
          <span
            style={{
              // border: "1px solid #ff000065",
              color: "red",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Disable
          </span>
        )}
      </>
    ),
  },
  {
    field: "user_roles_Id",
    headerName: "Role",
    width: 100,
    renderCell: (params) => (
      <>
        {params.row.user_roles_Id === 1 ? "Admin" : null}
        {params.row.user_roles_Id === 2 ? "Manager" : null}
        {params.row.user_roles_Id === 3 ? "Staff" : null}
        {params.row.user_roles_Id === 4 ? "Client" : null}
      </>
    ),
  },
];

const UsersPage = () => {
  // get login user
  const loginUser = JSON.parse(localStorage.getItem("u"));

  const dispatch = useDispatch();
  const { isLoading, users, /*totalUsers, activeUsers,*/ disableUsers } =
    useSelector((store) => store.user);

  // const [disableAcc, setDisabledAcc] = useState([]);
  // const [activeAcc, setActiveAcc] = useState([]);

  // card slice
  const { totalUsers, activeUsers, disabledUsers } = useSelector(
    (store) => store.cards
  );

  // api call for user numbers
  const fetchUserNumbers = async (store) => {
    try {
      const { data } = await axiosInstance.get(
        `/users/numbers/partners/${loginUser?.p}/roles/${loginUser?.r}/user/${loginUser?.I}`
      );

      console.log("-------------- user-------------------");
      console.log(data);
      console.log("-------------- user-------------------");
      dispatch(setTotalUsers(data.total));
      dispatch(setActiveUsers(data.enabled));
      dispatch(setDisabledUsers(data.disabled));
    } catch (error) {
      console.error(error);
    }
  };

  // load user numbers for cards
  useEffect(() => {
    fetchUserNumbers();
  }, []);

  //load users
  useEffect(() => {
    //show speed dial
    dispatch(setShowSpeedDial(true));
    //get users
    dispatch(getUserList());
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            bottom: 0,
            marginTop: "20%",
            marginLeft: "50%",
            fontSize: "2rem",
          }}
        >
          {}
          <Progress />
        </div>
      ) : (
        <>
          <CardWidget
            heading="Total Users"
            icon={<NumbersIcon className="card-icon" />}
            value={totalUsers}
          />
          <CardWidget
            heading="Active Accounts"
            icon={<PeopleAltIcon className="card-icon" />}
            value={activeUsers}
          />
          <CardWidget
            heading="Disabled Accounts"
            icon={<PersonOffIcon className="card-icon" />}
            value={disableUsers}
          />
          <CardWidget
            heading="Disabled Accounts"
            icon={<PersonOffIcon className="card-icon" />}
            value={disableUsers}
          />
          <DataTableList
            rows={users}
            // rows={fakeUsers}
            columns={columns}
            getRowId={(users) => users.Id}
            tableTitle="Users List"
          />
        </>
      )}
    </>
  );
};

export default UsersPage;
