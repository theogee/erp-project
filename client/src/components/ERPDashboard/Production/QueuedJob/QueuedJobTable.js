/** @jsxImportSource @emotion/react */
import React from "react";

import Box from "@mui/material/Box";

import { GeeTable } from "../../../GeeComponents";

export default function QueuedJobTable(props) {
  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "JOBS", map: "name" },
    { label: "UNIT", map: "qty" },
    { label: "STATUS", forcedValue: "on going" },
  ];

  return (
    <Box sx={{ marginBottom: "39px" }}>
      <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Queued Jobs</h1>
      <GeeTable
        tableData={props.queuedJobs}
        headCells={headCells}
        checkedID="product_batch_id"
        onChecked={(checkedID) => {
          props.setInspectedJobID(checkedID);
        }}
        minWidth="504px"
      />
    </Box>
  );
}
