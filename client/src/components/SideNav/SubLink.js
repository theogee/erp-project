import { default as React, useState } from "react";

import { NavLink } from "react-router-dom";

import styled from "@emotion/styled";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const StyledSubLink = styled(Link)`
  padding: 12px;
  font-size: 14px;
  display: block;
  color: black;
  text-align: right;
  border-right: 2px solid transparent;
`;

export default function SubLink(props) {
  const { subLink, isLast } = props;

  const [active, setActive] = useState(false);

  return (
    <StyledSubLink
      key={subLink.name}
      component={NavLink}
      to={subLink.to}
      end={subLink.end}
      underline="none"
      style={({ isActive }) => setActive(isActive)}
      sx={() => {
        if (isLast)
          return {
            borderBottom: "2px solid black",
            marginBottom: "10px",
          };
        return {};
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        {active && (
          <CheckRoundedIcon
            color="black"
            sx={{ marginRight: "5px", height: "17px", width: "17px" }}
          />
        )}
        {subLink.name}
      </Stack>
    </StyledSubLink>
  );
}
