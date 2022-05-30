import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { GeeTable } from "../../GeeComponents";

import InspectedProduct from "./InspectedProduct";

export default function Product() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [tableData, setTableData] = React.useState([]);
  const [inspectedProductID, setInspectedProductID] = React.useState(0);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "PRICE", map: "price", width: "60px" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/product?businessID=${params.businessID}`,
          {
            withCredentials: true,
          }
        );

        console.log(data.data);

        setTableData(data.data);
        setInspectedProductID(data.data[0].product_id)
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box component="main" sx={{ backgroundColor: "#F3F3F3" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Product</h1>
        <GeeTable
          tableData={tableData}
          headCells={headCells}
          checkedID="product_id"
          onChecked={setInspectedProductID}
          minWidth="504px"
        />
      </Box>
      <Box sx={{ width: "600px" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          Inspecting Product...
        </h1>
        <InspectedProduct inspectedProductID={inspectedProductID} />
      </Box>
    </Stack>
  );
}
