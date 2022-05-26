import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useOutletContext } from "react-router-dom";
import { Stack } from "@mui/material";

export default function Product() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { user, businessID } = useOutletContext();

  return (
    <Stack>
      <h1>PRODUCT</h1>
      <br />
      <Outlet context={{ user, businessID }} />
    </Stack>
  );
}