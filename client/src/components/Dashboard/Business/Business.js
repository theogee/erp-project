/** @jsxImportSource @emotion/react */
import { default as React, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Box from "@mui/material/Box";

import NoBusinessCard from "./NoBusinessCard";
import AddBusinessCard from "./AddBusinessCard";

import { BusinessCards } from "./BusinessCards";

export default function Business() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + "/api/business", {
          withCredentials: true,
        });

        setBusinessData(data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

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
