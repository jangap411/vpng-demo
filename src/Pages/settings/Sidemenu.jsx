import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";

import { PARTNERS, ROLES } from "../../utils/checkUserPartnerAndRole";

const Sidemenu = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  //parters array
  const allowedPartners = [PARTNERS.FINCORP];
  const user_roles = [ROLES.ADMIN];

  const ACCESS = allowedPartners.includes(user?.p);
  const ROLES_ACCESS = user_roles.includes(user?.r);

  return (
    <>
      <Paper sx={{ height: "100%" }}>
        <NavLink to="account">
          <ListItemButton>
            <ListItemIcon>
              {/* <Tooltip title="My account" placement="right">
            </Tooltip> */}
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </NavLink>
        {ACCESS && (
          <>
            {ROLES_ACCESS ? (
              <>
                <NavLink to="banks">
                  <ListItemButton>
                    <ListItemIcon>
                      {/* <Tooltip title="Banks" placement="right">
            </Tooltip> */}
                      <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Banks" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="province" disabled>
                  <ListItemButton>
                    <ListItemIcon>
                      {/* <Tooltip title="Provinces" placement="right">
            </Tooltip> */}
                      <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Provinces" />
                  </ListItemButton>
                </NavLink>
                <NavLink to="dealers">
                  <ListItemButton>
                    <ListItemIcon>
                      {/* <Tooltip title="Dealers" placement="right">
            </Tooltip> */}
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dealers" />
                  </ListItemButton>
                </NavLink>
              </>
            ) : null}
          </>
        )}
      </Paper>
    </>
  );
};

export default Sidemenu;
