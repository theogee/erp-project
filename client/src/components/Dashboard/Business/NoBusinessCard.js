/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function NoBusinessCard() {
  const navigate = useNavigate();
  return (
    <Paper
      variant="topBorderGreen"
      sx={{
        padding: "41px 96px",
        textAlign: "center",
        width: "821px",
        height: "203px",
        marginTop: "42px",
      }}
    >
      <p css={{ marginBottom: "35px", fontFamily: "Roboto, sans-serif" }}>
        You currently doesn't have any business registered. Add your business
        and start your success journey.
      </p>
      <Button
        sx={{ padding: "12px 31px" }}
        variant="containedGreen"
        disableElevation
        onClick={() => navigate("/dashboard/business/create")}
      >
        Add Business
      </Button>
    </Paper>
  );
}
