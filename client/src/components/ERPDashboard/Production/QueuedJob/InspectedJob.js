/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

import { formatPrice } from "../../../lib/utils";

import { GeeTable } from "../../../GeeComponents";

export default function InspectedJob(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const { inspectedJobID } = props;

  const navigate = useNavigate();
  const params = useParams();

  const [inspectedProductBatch, setInspectedProductBatch] = React.useState({});
  const [inspectedProduct, setInspectedProduct] = React.useState({});
  const [inspectedProductMaterials, setInspectedProductMaterials] =
    React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data: productBatchData } = await axios.get(
          SERVER_URL + `/api/product_batches/${inspectedJobID}`,
          { withCredentials: true }
        );

        setInspectedProductBatch(productBatchData.data);

        const getProduct = () =>
          axios.get(
            SERVER_URL + `/api/product/${productBatchData.data.product_id}`,
            {
              withCredentials: true,
            }
          );

        const getProductMaterials = () =>
          axios.get(
            SERVER_URL +
              `/api/product_material?productID=${productBatchData.data.product_id}`,
            { withCredentials: true }
          );

        const [{ data: product }, { data: productMaterials }] =
          await Promise.all([getProduct(), getProductMaterials()]);

        console.log(product);

        setInspectedProduct(product.data);
        setInspectedProductMaterials(productMaterials.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedJobID]);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "qty" },
    { label: "MEA.", map: "measurement_name" },
  ];

  const verifyJob = async () => {
    try {
      await axios.put(
        SERVER_URL + `/api/job/${inspectedJobID}/verify`,
        { businessID: params.businessID },
        {
          withCredentials: true,
        }
      );
      props.refreshTable();
    } catch (err) {
      console.log(err);
    }
  };

  const cancelJob = async () => {
    try {
      await axios.put(
        SERVER_URL + `/api/job/${inspectedJobID}/cancel`,
        { businessID: params.businessID },
        { withCredentials: true }
      );

      props.refreshTable();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ minWidht: "600px", maxWidth: "40vw" }}>
      {inspectedJobID !== 0 && (
        <>
          <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
            Inspecting Job...
          </h1>
          <Paper
            variant="customPaper"
            sx={{ padding: "30px", position: "relative" }}
          >
            <TextField
              value={inspectedProduct.name}
              label="Name"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: inspectedProduct.name ? true : false,
              }}
              css={{ marginBottom: "30px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              value={inspectedProductBatch.qty}
              label="Unit"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: inspectedProductBatch.qty ? true : false,
              }}
              css={{ marginBottom: "30px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              value={inspectedProduct.production_process}
              label="Production Process"
              size="small"
              multiline
              minRows={3}
              fullWidth
              InputLabelProps={{
                shrink: inspectedProduct.production_process ? true : false,
              }}
              css={{ marginBottom: "30px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <p css={{ marginBottom: "10px" }}>Materials/Unit</p>
            <GeeTable
              tableData={inspectedProductMaterials}
              headCells={headCells}
              checkedID="material_id"
              onChecked={() => {}}
              minWidth="100%"
            />
            <Button
              onClick={verifyJob}
              variant="containedBlue"
              sx={{ width: "100%", padding: "10px 0", marginTop: "35px" }}
            >
              Verify Done
            </Button>
            <Button
              onClick={cancelJob}
              variant="containedRed"
              sx={{ width: "100%", padding: "10px 0", marginTop: "16px" }}
            >
              Cancel
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
}
