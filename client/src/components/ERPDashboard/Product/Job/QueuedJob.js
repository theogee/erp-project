import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { GeeTable } from "../../../GeeComponents";

import InspectedBatches from "./InspectedBatches";

export default function QueuedJob() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [tableData, setTableData] = React.useState([]);
  const [inspectedProductBatchesID, setInspectedProductBatchesID] =
    React.useState(0);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "BATCH NO", map: "product_batch_id" },
    { label: "PRODUCTION DATE", map: "production_date" },
    { label: "EXPIRY DATE", map: "expiry_date" },
    { label: "QTY", map: "qty" },
    { label: "STATUS", map: "definedStatus", width: "70px", type: "status" },
  ];

  const formatDate = (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/product_batches?businessID=${params.businessID}`,
          {
            withCredentials: true,
          }
        );

        console.log(data.data);

        data.data.forEach((data) => {
          data.expiry_date = formatDate(data.expiry_date);
          data.production_date = formatDate(data.production_date);
        });

        setTableData(data.data);
        setInspectedProductBatchesID(data.data[0].product_batch_id);
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
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Queued Jobs</h1>
        <GeeTable
          tableData={tableData}
          headCells={headCells}
          checkedID="product_batch_id"
          onChecked={setInspectedProductBatchesID}
          minWidth="504px"
        />
      </Box>
      <Box sx={{ width: "600px" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          Inspecting Queued Jobs...
        </h1>
        <InspectedBatches
          inspectedProductBatchesID={inspectedProductBatchesID}
        />
      </Box>
    </Stack>
  );
}
