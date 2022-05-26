/** @jsxImportSource @emotion/react */
import React from "react";

import Box from "@mui/material/Box";

import MaterialTable from "./MaterialTable";

export default function InventoryMaterials() {
  return (
    <Box component="main" sx={{ backgroundColor: "#F3F3F3" }}>
      <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Materials</h1>
      <MaterialTable />
    </Box>
  );
}
