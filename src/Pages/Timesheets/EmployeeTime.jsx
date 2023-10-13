import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// state management
import { useSelector, useDispatch } from "react-redux";
import { setOpenModal } from "../../features/contentModal/contentModal";

// fake data

const tableHeading = ["#", "Name", "Card #", "Dept", "Total Hrs", "Action"];
const tableData = [
  {
    id: "1",
    date: "16-09-2023",
    comment: "Sick Leave",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
  {
    id: "2",
    date: "17-09-2023",
    comment: "",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
  {
    id: "3",
    date: "18-09-2023",
    comment: "",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
  {
    id: "4",
    date: "19-09-2023",
    comment: "",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
  {
    id: "5",
    date: "20-09-2023",
    comment: "",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
  {
    id: "6",
    date: "16-09-2023",
    comment: "",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
  {
    id: "7",
    date: "21-09-2023",
    comment: "",
    timeIn: "08:00 AM",
    timeOut: "05:00 AM",
    hrs: 8,
  },
];

const EmployeeTime = () => {
  // state management
  const dispatch = useDispatch();
  const { openModal } = useSelector((state) => state.contentModal);

  return (
    <>
      <Page>
        <Title>Employee Time</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time out</TableCell>
              <TableCell>Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((time) => (
              <TableRow
                key={time.id}
                sx={{ cursor: "pointer" }}
                onClick={(e) => dispatch(setOpenModal(!openModal))}
              >
                <TableCell>{time.id}</TableCell>
                <TableCell>{time.date}</TableCell>
                <TableCell>{time.comment}</TableCell>
                <TableCell>{time.timeIn}</TableCell>
                <TableCell>{time.timeOut}</TableCell>
                <TableCell>{time.hrs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Page>
    </>
  );
};

export default EmployeeTime;
