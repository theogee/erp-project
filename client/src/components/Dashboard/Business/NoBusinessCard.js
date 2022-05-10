/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

const StyledCard = styled(Card)`
  width: 821px;
  height: 203px;
  border-top: 5px solid #4af48e;
`;

export default function NoBusinessCard() {
  const navigate = useNavigate();
  return (
    <StyledCard variant="outlined">
      <Box sx={{ padding: "41px 96px", textAlign: "center" }}>
        <p css={{ marginBottom: "35px", fontFamily: "Roboto, sans-serif" }}>
          You currently doesn't have any business registered. Add your business
          and start your success journey.
        </p>
        <Button
          sx={{ padding: "12px 31px" }}
          variant="containedGreen"
          disableElevation="true"
          onClick={() => navigate("/dashboard/business/create")}
        >
          Add Business
        </Button>
      </Box>
    </StyledCard>
  );
}
