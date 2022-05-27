/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import { GeeTable } from "../../../GeeComponents";

export default function InventoryMaterials() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [tableData, setTableData] = React.useState([]);
  const [inspectedMaterialID, setInspectedMaterialID] = React.useState();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/material?businessID=${params.businessID}`,
          {
            withCredentials: true,
          }
        );

        setTableData(data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "cummulative_qty", width: "60px" },
    { label: "MEAS.", map: "measurement_name", width: "60px" },
    { label: "STATUS", map: "definedStatus", width: "70px" },
  ];

  return (
    <Box component="main" sx={{ backgroundColor: "#F3F3F3" }}>
      <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Materials</h1>
      <GeeTable
        tableData={tableData}
        headCells={headCells}
        onChecked={setInspectedMaterialID}
      />
    </Box>
  );
}
