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

export default function InspectedProduct(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const { inspectedProductID } = props;

  const navigate = useNavigate();
  const params = useParams();

  const [inspectedProduct, setInspectedProduct] = React.useState({});
  const [inspectedProductMaterials, setInspectedProductMaterials] =
    React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const getProduct = () =>
          axios.get(SERVER_URL + `/api/product/${inspectedProductID}`, {
            withCredentials: true,
          });

        const getProductMaterials = () =>
          axios.get(
            SERVER_URL +
              `/api/product_material?productID=${inspectedProductID}`,
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
  }, [inspectedProductID]);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "qty" },
    { label: "MEA.", map: "measurement_name" },
  ];

  return (
    <Box sx={{ minWidht: "600px", maxWidth: "40vw" }}>
      {inspectedProductID !== 0 && (
        <>
          <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
            Inspecting Product...
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
              value={formatPrice(inspectedProduct.price || 0)}
              label="Price"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: inspectedProduct.price ? true : false,
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
            <Stack
              direction="row"
              sx={{
                width: "90px",
                position: "absolute",
                right: "10px",
                top: "-50px",
              }}
              justifyContent="space-between"
            >
              <Paper variant="elevatedButton" component={Button}>
                <ModeEditRoundedIcon
                  color="primary"
                  sx={{ fontSize: "20px" }}
                  onClick={() => {}}
                />
              </Paper>
              <Paper
                variant="elevatedButton"
                component={Button}
                onClick={() => {}}
              >
                <DeleteIcon color="red" sx={{ fontSize: "20px" }} />
              </Paper>
            </Stack>
          </Paper>
        </>
      )}
    </Box>
  );
}
