/** @jsxImportSource @emotion/react */
import React from "react";

import Paper from "@mui/material/Paper";

export default function TopBorderCard(props) {
  return (
    <Paper
      variant={props.variant}
      sx={{
        width: "500px",
        padding: "20px 25px",
      }}
    >
      <p css={{ marginBottom: "35px", fontFamily: "Roboto, sans-serif" }}>
        {props.text}
      </p>
      {props.children}
    </Paper>
  );
}
