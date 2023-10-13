import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Paper,
} from "@mui/material";
import Title from "./Title";
import AddItemSpeedDial from "./AddItemSpeedDial";
import { Link } from "react-router-dom";
//state
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../features/header/titleSlice";
import {
  setApplications,
  setIsLoading,
} from "../features/application/applicationSlice";
import Progress from "./Progress";
import { PARTNERS, ROLES } from "../utils/checkUserPartnerAndRole";
import { axiosInstance } from "../utils/axiosHeaderConfig";

const TableItem = () => {
  const loginUser = JSON.parse(localStorage.getItem("u"));
  const dispatch = useDispatch();

  const { applications, isLoading } = useSelector((state) => state.application);

  const { user } = useSelector((state) => state.profile);
  const allowedPartners = [PARTNERS.FINCORP];

  const ACCESS = allowedPartners.includes(user?.p);

  const getRecentApplicationList = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/applications/partners/${loginUser?.p}/users/${loginUser?.I}`
      );
      dispatch(setIsLoading(false));
      dispatch(setApplications(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecentApplicationList();
  }, []);

  return (
    <>
      <Grid item xs={12}>
        {ACCESS && <AddItemSpeedDial />}
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {/* <MuiDataTable /> */}

          <Title>Recently Lodged Applications</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Applicant</TableCell>
                <TableCell>Lodged Date</TableCell>
                <TableCell>Sales Rep</TableCell>
                <TableCell>Loan Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      paddingLeft: "20%",
                      marginLeft: "20%",
                    }}
                  >
                    <Progress />
                  </TableCell>
                </TableRow>
              ) : (
                applications.map(
                  (app, idx) =>
                    idx < 10 && (
                      <TableRow key={app.Id}>
                        <TableCell>
                          <Link key={app.Id} to={`applications/${app.Id}`}>
                            {app?.client.firstName} {app?.client.lastName}
                          </Link>
                        </TableCell>
                        <TableCell>{app?.dateLodged}</TableCell>
                        <TableCell>{app?.user?.userName}</TableCell>
                        <TableCell>{`PKG ${app?.amountApplied}`}</TableCell>
                      </TableRow>
                    )
                )
              )}
            </TableBody>
          </Table>
          <Link
            to="applications"
            onClick={() => dispatch(setName("Applications"))}
            style={{ padding: "8px 4px", marginTop: "5px", color: "#E93749" }}
          >
            View All Applications
          </Link>
        </Paper>
      </Grid>
    </>
  );
};

export default TableItem;
