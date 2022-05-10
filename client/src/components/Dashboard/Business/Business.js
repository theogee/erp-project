/** @jsxImportSource @emotion/react */
import React from "react";

import Box from "@mui/material/Box";

import NoBusinessCard from "./NoBusinessCard";

export default function Business(props) {
  return (
    <Box component="section">
      <h1
        css={{
          paddingLeft: "18px",
          borderLeft: "5px solid #4AF48E",
          marginBottom: "42px",
        }}
      >
        Your Business
      </h1>
      <NoBusinessCard />
    </Box>
  );
}
