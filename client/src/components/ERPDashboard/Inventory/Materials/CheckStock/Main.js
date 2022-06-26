/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { GeeCircleStatus, GeeTable } from "../../../../GeeComponents";

import { formatDate, formatPrice } from "../../../../lib/utils";

import UpdateStock from "./UpdateStock";

export default function Main() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [material, setMaterial] = React.useState({});
  const [batches, setBatches] = React.useState([]);
  const [inspectedBatch, setInspectedBatch] = React.useState({});
  const [supplier, setSupplier] = React.useState({});

  const getMaterial = async () => {
    try {
      const [{ data: materialData }, { data: batchesData }] = await Promise.all(
        [
          axios.get(SERVER_URL + `/api/material/${params.materialID}`, {
            withCredentials: true,
          }),
          axios.get(
            SERVER_URL + `/api/batches?materialID=${params.materialID}`,
            {
              withCredentials: true,
            }
          ),
        ]
      );

      batchesData.data = batchesData.data.filter((b) => b.current_qty !== 0);

      if (batchesData.data.length === 0)
        navigate(`/b/${params.businessID}/dashboard/inventory/materials`);

      batchesData.data.forEach((data) => {
        data.purchase_date = formatDate(data.purchase_date);
        data.expiry_date = formatDate(data.expiry_date);
        data.purchase_price = formatPrice(data.purchase_price);
        data.price_per_unit = formatPrice(data.price_per_unit);
      });

      setMaterial(materialData.data);
      setBatches(batchesData.data);
      setInspectedBatch(batchesData.data[0]);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  React.useEffect(() => {
    getMaterial();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        if (inspectedBatch.supplier_id) {
          const { data: supplierData } = await axios.get(
            SERVER_URL + `/api/supplier/${inspectedBatch.supplier_id}`,
            { withCredentials: true }
          );
          setSupplier(supplierData.data[0]);
        }
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedBatch.batch_id]);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "PUR. DATE", map: "purchase_date", width: "70px" },
    { label: "EX. DATE", map: "expiry_date", width: "80px" },
    { label: "QTY", map: "current_qty", width: "50px" },
    {
      label: "MEAS.",
      forcedValue: material.measurement_name,
      width: "70px",
    },
    { label: "PRICE/UNIT", map: "price_per_unit", width: "60px" },
    { label: "PUR. PRICE", map: "purchase_price", width: "90px" },
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
          <p>Name: {material.name}</p>
          <p>
            Total Qty: {material.cummulative_qty} {material.measurement_name}
          </p>
          {material.safety_stock_qty && (
            <>
              <p>
                Safety Stock: {material.safety_stock_qty}{" "}
                {material.measurement_name}
              </p>
              <Stack component="p" direction="row" alignItems="center">
                <p css={{ marginRight: "10px" }}>Status:</p>
                <GeeCircleStatus
                  type="stock"
                  cummulativeQty={material.cummulative_qty}
                  safetyStockQty={material.safety_stock_qty}
                />
              </Stack>
            </>
          )}
        </Paper>
        <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Refill Batches</h2>
        <GeeTable
          tableData={batches}
          headCells={headCells}
          minWidth="100%"
          checkedID="batch_id"
          onChecked={(batchID) =>
            setInspectedBatch(
              batches.find((batch) => batch.batch_id === batchID)
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
          <p>Batch ID: {inspectedBatch.batch_id}</p>
          <p>Supplier: {supplier.name}</p>
          <p>
            Purchase Qty: {inspectedBatch.purchase_qty}{" "}
            {material.measurement_name}
          </p>
          <p>
            Current Qty: {inspectedBatch.current_qty}{" "}
            {material.measurement_name}
          </p>
          <p>Price/Unit: {inspectedBatch.price_per_unit}</p>
          <p>Purchase Price: {inspectedBatch.purchase_price}</p>
          <p>Purchase Date: {inspectedBatch.purchase_date}</p>
          <p>Expiry Date: {inspectedBatch.expiry_date}</p>
        </Paper>
        <UpdateStock
          currentQty={inspectedBatch.current_qty}
          measurementName={material.measurement_name}
          inspectedBatchID={inspectedBatch.batch_id}
          refreshData={getMaterial}
        />
      </Box>
    </Stack>
  );
}
