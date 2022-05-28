/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { GeeCircleStatus, GeeTable } from "../../../GeeComponents";

const StyledPaper = styled(Paper)`
  font-size: 13px;
  & > p {
    margin: 5px 0;
    font-weight: 500;
  }
`;

export default function InspectedMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [inspectedMaterial, setInspectedMaterial] = React.useState({});
  const [inspectedBatches, setInspectedBatches] = React.useState([]);
  const [inspectedBatch, setInspectedBatch] = React.useState({});
  const [supplier, setSupplier] = React.useState({});

  const navigate = useNavigate();

  const { inspectedMaterialID } = props;

  React.useEffect(() => {
    (async () => {
      try {
        const { data: materialData } = await axios.get(
          SERVER_URL + `/api/material/${inspectedMaterialID}`,
          {
            withCredentials: true,
          }
        );

        setInspectedMaterial(materialData.data);

        const { data: batchesData } = await axios.get(
          SERVER_URL + `/api/batches?materialID=${inspectedMaterialID}`,
          { withCredentials: true }
        );

        batchesData.data.forEach((data) => {
          data.purchase_date = formatDate(data.purchase_date);
          data.expiry_date = formatDate(data.expiry_date);
          data.purchase_price = formatPrice(data.purchase_price);
          data.price_per_unit = formatPrice(data.price_per_unit);
        });

        setInspectedBatches(batchesData.data);
        setInspectedBatch(batchesData.data[0]);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedMaterialID]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data: supplierData } = await axios.get(
          SERVER_URL + `/api/supplier/${inspectedBatch.supplier_id}`,
          {
            withCredentials: true,
          }
        );

        setSupplier(supplierData.data[0]);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedBatch]);

  const formatDate = (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const formatPrice = (priceData) => {
    return "IDR " + priceData.toLocaleString("id-ID");
  };

  const calcTotalQty = () => {
    return inspectedBatches.reduce(
      (prev, current) => prev + current.current_qty,
      0
    );
  };

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "PUR. DATE", map: "purchase_date", width: "70px" },
    { label: "EX. DATE", map: "expiry_date", width: "80px" },
    { label: "QTY", map: "current_qty", width: "50px" },
    {
      label: "MEAS.",
      forcedValue: inspectedMaterial.measurement_name,
      width: "70px",
    },
    { label: "PRICE/UNIT", map: "price_per_unit", width: "60px" },
    { label: "PUR. PRICE", map: "purchase_price", width: "90px" },
  ];

  return (
    <Box>
      <StyledPaper variant="customPaper">
        <p>Name: {inspectedMaterial.name}</p>
        <p>
          Total Qty: {calcTotalQty()} {inspectedMaterial.measurement_name}
        </p>
        {inspectedMaterial.safety_stock_qty && (
          <>
            <p>
              Safety Stock: {inspectedMaterial.safety_stock_qty}{" "}
              {inspectedMaterial.measurement_name}
            </p>
            <Stack component="p" direction="row" alignItems="center">
              <p css={{ marginRight: "10px" }}>Status:</p>
              <GeeCircleStatus
                cummulativeQty={inspectedMaterial.cummulative_qty}
                safetyStockQty={inspectedMaterial.safety_stock_qty}
              />
            </Stack>
          </>
        )}
      </StyledPaper>
      <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Refill Batches</h2>
      <GeeTable
        tableData={inspectedBatches}
        headCells={headCells}
        minWidth="100%"
        checkedID="batch_id"
        onChecked={(batchID) =>
          setInspectedBatch(
            inspectedBatches.find((batch) => batch.batch_id === batchID)
          )
        }
      />
      <StyledPaper sx={{ marginTop: "34px" }} variant="customPaper">
        <p>Supplier: {supplier.name}</p>
        <p>
          Purchase Qty: {inspectedBatch.purchase_qty}{" "}
          {inspectedMaterial.measurement_name}
        </p>
        <p>
          Current Qty: {inspectedBatch.current_qty}{" "}
          {inspectedMaterial.measurement_name}
        </p>
        <p>Price/Unit: {inspectedBatch.price_per_unit}</p>
        <p>Purchase Price: {inspectedBatch.purchase_price}</p>
        <p>Purchase Date: {inspectedBatch.purchase_date}</p>
        <p>Expiry Date: {inspectedBatch.expiry_date}</p>
      </StyledPaper>
    </Box>
  );
}
