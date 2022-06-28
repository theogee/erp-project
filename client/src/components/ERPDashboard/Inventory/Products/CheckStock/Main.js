/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { GeeTable } from "../../../../GeeComponents";

import { formatDate, formatPrice } from "../../../../lib/utils";

import UpdateStock from "./UpdateStock";

export default function Main() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = React.useState({});
  const [batches, setBatches] = React.useState([]);
  const [inspectedBatch, setInspectedBatch] = React.useState({});

  const getProduct = async () => {
    try {
      const [{ data: productData }, { data: batchesData }] = await Promise.all([
        axios.get(SERVER_URL + `/api/product/${params.productID}`, {
          withCredentials: true,
        }),
        axios.get(
          SERVER_URL +
            `/api/product_batches/p/${params.productID}?status=green`,
          {
            withCredentials: true,
          }
        ),
      ]);

      batchesData.data = batchesData.data.filter((b) => b.qty !== 0);

      if (batchesData.data.length === 0)
        navigate(`/b/${params.businessID}/dashboard/inventory/products`);

      batchesData.data.forEach((data) => {
        data.production_date = formatDate(data.production_date);
        data.expiry_date = formatDate(data.expiry_date);
      });

      setProduct(productData.data);
      setBatches(batchesData.data);
      setInspectedBatch(batchesData.data[0]);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "PRO. DATE", map: "production_date", width: "20px" },
    { label: "EX. DATE", map: "expiry_date", width: "150px" },
    { label: "QTY", map: "qty", width: "50px" },
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box sx={{ minWidth: "45%" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Check Stock</h1>
        <Paper variant="customPaper" code="inspect">
          <p>Name: {product.name}</p>
          <p>
            Total Qty:{" "}
            {batches.reduce((prev, current) => prev + current.qty, 0)}
            {" unit(s)"}
          </p>
          <p>Price/Unit: {formatPrice(product.price || "")}</p>
        </Paper>
        <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Product Batches</h2>
        <GeeTable
          tableData={batches}
          headCells={headCells}
          minWidth="100%"
          checkedID="product_batch_id"
          onChecked={(batchID) =>
            setInspectedBatch(
              batches.find((batch) => batch.product_batch_id === batchID)
            )
          }
        />
      </Box>
      <Box sx={{ width: "50%" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          Updating Stock...
        </h1>
        <Paper
          variant="customPaper"
          code="inspect"
          sx={{ marginBottom: "40px" }}
        >
          <p>Batch ID: {inspectedBatch.product_batch_id}</p>
          <p>
            Current Qty: {inspectedBatch.qty}
            {" unit(s)"}
          </p>
          <p>Production Date: {inspectedBatch.production_date}</p>
          <p>Expiry Date: {inspectedBatch.expiry_date}</p>
        </Paper>
        <UpdateStock
          currentQty={inspectedBatch.qty}
          inspectedBatchID={inspectedBatch.product_batch_id}
          refreshData={getProduct}
          businessID={params.businessID}
        />
      </Box>
    </Stack>
  );
}
