/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useState } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { GeeCircleStatus } from "../../../GeeComponents";

export default function InspectedBatches(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [productBatches, setProductBatches] = React.useState({});

  const navigate = useNavigate();

  const { inspectedProductBatchesID } = props;

  React.useEffect(() => {
    (async () => {
      setProductBatches({});
      try {
        const { data: productBatchesData } = await axios.get(
          SERVER_URL + `/api/product_batches/${inspectedProductBatchesID}`,
          {
            withCredentials: true,
          }
        );
        console.log(productBatchesData.data);
        productBatchesData.data.expiry_date = formatDate(
          productBatchesData.data.expiry_date
        );
        productBatchesData.data.production_date = formatDate(
          productBatchesData.data.production_date
        );
        setProductBatches(productBatchesData.data);
        console.log(productBatches);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedProductBatchesID]);

  const formatDate = (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  return (
    <Box>
      <Box
        sx={{
          fontSize: "13px",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "15px 30px",
          boxShadow:
            "0px 0px 0px 0.637838px rgba(152, 161, 178, 0.1), 0px 0.637838px 2.55135px rgba(69, 75, 87, 0.12), 0px 0px 1.27568px rgba(0, 0, 0, 0.08);",
          "& > p": {
            margin: "5px 0",
            fontWeight: "500",
          },
        }}
      >
        <p>Batch ID: {productBatches.product_batch_id}</p>
        <p>Name: {productBatches.name}</p>
        <p>Qty: {productBatches.qty} Pcs</p>
        <p>Production Date: {productBatches.production_date}</p>
        <p>Expiry Date: {productBatches.expiry_date}</p>
        <Stack component="p" direction="row" alignItems="center">
          <p css={{ marginRight: "10px" }}>Status:</p>
          <GeeCircleStatus type={"status"} status={productBatches.status} />
        </Stack>
      </Box>
    </Box>
  );
}
