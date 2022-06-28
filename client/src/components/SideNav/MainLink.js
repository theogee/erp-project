import { default as React, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import styled from "@emotion/styled";

import { default as ArrowUp } from "@mui/icons-material/ArrowDropUpRounded";
import { default as ArrowDown } from "@mui/icons-material/ArrowDropDownRounded";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";

import SubLinks from "./SubLinks";

const StyledMainLink = styled(Link)`
  font-size: 14px;
  display: block;
`;

export default function MainLink(props) {
  const { link } = props;

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(true);

  const handleOnClick = (e) => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!active) setOpen(false);
  }, [active]);

  const ArrowIcon = () => {
    return open ? (
      <ArrowUp
        color={active ? "white" : "black"}
        fontSize="small"
        onClick={handleOnClick}
      />
    ) : (
      <ArrowDown
        color={active ? "white" : "black"}
        fontSize="small"
        onClick={handleOnClick}
      />
    );
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          backgroundColor: active ? "#000000" : "white",
          borderRadius: "4px",
          padding: "12px",
        }}
      >
        <StyledMainLink
          component={NavLink}
          to={link.to}
          end={link.end}
          underline="none"
          flexGrow="100"
          style={({ isActive }) => {
            setActive(isActive);
            return {
              color: isActive ? "white" : "#000000",
            };
          }}
        >
          {link.name}
        </StyledMainLink>
        {link.subLinks && <ArrowIcon />}
      </Stack>
      {link.subLinks && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <SubLinks subLinks={link.subLinks} />
        </Collapse>
      )}
    </Box>
  );
}
