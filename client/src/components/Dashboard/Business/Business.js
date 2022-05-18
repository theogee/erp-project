/** @jsxImportSource @emotion/react */
import React from "react";

import businessData from "../../../test_data/business.data";

import Box from "@mui/material/Box";

import NoBusinessCard from "./NoBusinessCard";
import AddBusinessCard from "./AddBusinessCard";

import { BusinessCards } from "./BusinessCards";

export default function Business() {
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
      <BusinessCards businessData={businessData} />
      {businessData.length === 0 ? <NoBusinessCard /> : <AddBusinessCard />}
    </Box>
  );
}
