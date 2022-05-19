/** @jsxImportSource @emotion/react */

import React from "react";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

export default function BusinessCard(props) {
  return (
    <Button
      component={Paper}
      variant="outlined"
      color="black"
      sx={{
        width: "241px",
        height: "100px",
        cursor: "pointer",
        textTransform: "none",
        borderColor: "rgba(0, 0, 0, 0.12)",
        "&:hover": {
          borderColor: "rgba(0, 0, 0, 0.12)",
        },
      }}
      disableElevation
    >
      <Avatar
        alt={props.name}
        src={"img.jpg"} // testing
        referrerPolicy="no-referrer"
        sx={{ width: "39px", height: "39px", marginRight: "7px" }}
      />
      <p css={{ fontSize: "13px", fontWeight: 500 }}>{props.name}</p>
    </Button>
  );
}
