import React from "react";

import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

const StyledCard = styled(Card)`
  width: 821px;
  height: 203px;
  border-top: 5px solid #4af48e;
`;

const StyledButton = styled(Button)`
  background-color: #4af48e;
  color: black;
  text-transform: none;
  font-weight: 700;
  &:hover {
    background-color: #4af48e;
  }
`;

export default function NoBusinessCard() {
  return (
    <StyledCard variant="outlined">
      <Box sx={{ padding: "41px 96px", textAlign: "center" }}>
        <p css={{ marginBottom: "35px", fontFamily: "Roboto, sans-serif" }}>
          You currently doesn't have any business registered. Add your business
          and start your success journey.
        </p>
        <StyledButton disableElevation="true" variant="contained">
          Add Business
        </StyledButton>
      </Box>
    </StyledCard>
  );
}
