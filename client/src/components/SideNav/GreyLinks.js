import React from "react";

import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";

import styled from "@emotion/styled";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const StyledGreyLink = styled(Link)`
  padding: 12px;
  font-size: 12px;
  color: #4b5563;
`;

export default function GreyLinks() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get(SERVER_URL + "/auth/google/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const greyLinks = [
    { to: "/dashboard", name: "Home" },
    { to: "/dashboard/settings", name: "Settings" },
    { to: "/", name: "Logout", onClick: logout },
  ];

  return (
    <Stack sx={{ marginTop: "24px" }}>
      {greyLinks.map((link) => (
        <StyledGreyLink
          key={link.name}
          component={NavLink}
          to={link.to}
          underline="none"
          onClick={link.onClick ? link.onClick : ""}
        >
          {link.name}
        </StyledGreyLink>
      ))}
    </Stack>
  );
}
