/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { GeeTable } from "../../../GeeComponents";

import InspectedMaterial from "./InspectedMaterial";

export default function InventoryMaterials() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [tableData, setTableData] = React.useState([]);
  const [inspectedMaterialID, setInspectedMaterialID] = React.useState(2);

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
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Materials</h1>
        <GeeTable
          tableData={tableData}
          headCells={headCells}
          checkedID="material_id"
          onChecked={setInspectedMaterialID}
          minWidth="504px"
          tableButton={{ label: "Add material", onClick: () => {} }}
        />
      </Box>
      <Box sx={{ width: "600px" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          Inspecting Materials...
        </h1>
        <InspectedMaterial inspectedMaterialID={inspectedMaterialID} />
      </Box>
    </Stack>
  );
}
