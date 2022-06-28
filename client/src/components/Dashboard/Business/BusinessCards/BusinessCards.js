import React from "react";

import Grid from "@mui/material/Grid";

import BusinessCard from "./BusinessCard";

export default function BusinessCards({ businessData }) {
  return (
    <Grid container rowSpacing={4} columnSpacing={2}>
      {businessData.map((business) => (
        <Grid item md={3}>
          <BusinessCard {...business} />
        </Grid>
      ))}
    </Grid>
  );
}
