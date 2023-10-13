import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// Action button in table row
const ActionButton = ({ id }) => {
  // routing
  const navigate = useNavigate();
  const location = useLocation();

  // get current path
  const currentPath = location.pathname;

  // handle page navigation
  const handlePageNavigation = (id) => {
    console.log("Page navigate");
    navigate(`${currentPath}/${id}`);
  };
  return (
    <>
      <Tooltip title="View Details" placement="right">
        <Button
          variant="outlined"
          style={{
            color: "#E93749",
            "&:hover": "#EB3C47",
            border: "1px solid #E93749",
          }}
          onClick={(e) => handlePageNavigation(id)}
        >
          View
        </Button>
      </Tooltip>
    </>
  );
};

export default ActionButton;
