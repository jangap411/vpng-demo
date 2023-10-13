import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import ActionButton from "./ActionButton";

const TableContent = ({ tableHeading, tableData }) => {
  return (
    <>
      <Table size="small" sx={{ mt: 5 }}>
        <TableHead>
          <TableRow>
            {tableHeading?.map((heading, idx) => (
              <TableCell key={idx}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>{user?.id}</TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.card}</TableCell>
              <TableCell>{user?.dept}</TableCell>
              <TableCell>{user?.hrs}</TableCell>
              <TableCell>
                <ActionButton id={user?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableContent;
