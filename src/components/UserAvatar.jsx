import React from "react";
import { Avatar, Stack, Tooltip } from "@mui/material";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const UserAvatar = () => {
  const { name } = localStorage.getItem("p")
    ? JSON.parse(localStorage.getItem("p"))
    : { name: "BB User" };

  return (
    <>
      <Stack direction="row" spacing={1} style={{ cursor: "pointer" }}>
        <Tooltip title={`${name}`} placement="left">
          <Avatar {...stringAvatar(`${name}`)} sx={{ width: 28, height: 28 }} />
        </Tooltip>
      </Stack>
    </>
  );
};

export default UserAvatar;
