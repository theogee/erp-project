import React from "react";

import { NavLink } from "react-router-dom";

import styled from "@emotion/styled";

import Link from "@mui/material/Link";

const StyledMainLink = styled(Link)`
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
`;

export default function MainLinks(props) {
  return props.links.map((link) => (
    <StyledMainLink
      key={link.name}
      component={NavLink}
      to={link.to}
      end={link.end}
      underline="none"
      style={({ isActive }) => ({
        backgroundColor: isActive ? "black" : "white",
        color: isActive ? "white" : "black",
      })}
    >
      {link.name}
    </StyledMainLink>
  ));
}
