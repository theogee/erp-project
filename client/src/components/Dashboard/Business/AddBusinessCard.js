/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function AddBusinessCard() {
  const navigate = useNavigate();

  return (
    <Paper
      component={Stack}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      variant="topBorderGreen"
      sx={{ padding: "10px 15px", marginTop: "93px" }}
    >
      <p css={{ fontSize: "12px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <Button
        variant="containedGreen"
        sx={{ fontSize: "13px" }}
        disableElevation
        onClick={() => navigate("/dashboard/business/create")}
      >
        Add Business
      </Button>
    </Paper>
  );
}
