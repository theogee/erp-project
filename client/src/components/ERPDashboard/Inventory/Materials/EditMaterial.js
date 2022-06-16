/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import {
  materialReducer,
  materialModel,
  getMaterialPayload,
  validateMaterial,
  utils,
} from "../../../lib/form";

export default function EditMaterial() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [isSafetyStockEnabled, setIsSafetyStockEnabled] = React.useState(true);

  const [material, materialDispatch] = React.useReducer(
    materialReducer.inputs,
    materialModel.inputs
  );

  const [errorMaterial, errorMaterialDispatch] = React.useReducer(
    materialReducer.errors,
    materialModel.errors
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data: materialData } = await axios.get(
          SERVER_URL + `/api/material/${params.materialID}`,
          {
            withCredentials: true,
          }
        );

        materialDispatch({
          type: "onchange-material-name",
          payload: { name: materialData.data.name },
        });

        materialDispatch({
          type: "onchange-material-measurement",
          payload: {
            id: materialData.data.measurement_id,
            name: materialData.data.measurement_name,
          },
        });

        setIsSafetyStockEnabled(materialData.data.safety_stock_qty !== null);

        if (materialData.data.safety_stock_qty) {
          materialDispatch({
            type: "onchange-material-safetyStockQty",
            payload: {
              safetyStockQty: materialData.data.safety_stock_qty + "",
            },
          });
        }
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const saveEdit = async () => {
    const materialPayload = getMaterialPayload(
      material,
      params.businessID,
      isSafetyStockEnabled
    );
    const materialValidationReport = validateMaterial(materialPayload);
    const error = utils.checkError([materialValidationReport]);

    if (error) {
      console.log(materialValidationReport);
      utils.showError([materialValidationReport], [errorMaterialDispatch]);
      return;
    }

    try {
      await axios.put(
        SERVER_URL + `/api/material/${params.materialID}`,
        materialPayload,
        { withCredentials: true }
      );
      navigate(`/b/${params.businessID}/dashboard/inventory/materials`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F3F3F3" }}>
      <Box sx={{ maxWidth: "50%" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          Editing Material...
        </h1>
        <Paper variant="customPaper" sx={{ padding: "30px" }}>
          <TextField
            value={material.name}
            label="Material name"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              materialDispatch({
                type: "onchange-material-name",
                payload: { name: e.target.value },
              });
              if (errorMaterial.name.error) {
                utils.resetError("error-name", errorMaterialDispatch);
              }
            }}
            error={errorMaterial.name.error}
            helperText={errorMaterial.name.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
          />
          <Stack
            direction="row"
            alignItems="center"
            sx={{ marginBottom: "20px" }}
          >
            <Checkbox
              checked={isSafetyStockEnabled}
              color="black"
              size="small"
              onChange={() => {
                setIsSafetyStockEnabled(!isSafetyStockEnabled);
                if (errorMaterial.safetyStockQty.error) {
                  utils.resetError(
                    "error-safetyStockQty",
                    errorMaterialDispatch
                  );
                }
              }}
            />
            <span css={{ fontSize: "13px" }}>Enable safety stock</span>
          </Stack>
          <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
            <TextField
              value={material.safetyStockQty}
              label="Qty"
              variant="outlined"
              color="black"
              required={isSafetyStockEnabled}
              onChange={(e) => {
                materialDispatch({
                  type: "onchange-material-safetyStockQty",
                  payload: { safetyStockQty: e.target.value },
                });
                if (errorMaterial.safetyStockQty.error) {
                  utils.resetError(
                    "error-safetyStockQty",
                    errorMaterialDispatch
                  );
                }
              }}
              error={errorMaterial.safetyStockQty.error}
              helperText={errorMaterial.safetyStockQty.msg}
              sx={{ flexGrow: 50 }}
              size="small"
              disabled={!isSafetyStockEnabled}
            />
            <TextField
              value={material.measurement.name}
              disabled
              label="Measurement"
              sx={{ flexGrow: 40 }}
              size="small"
              InputLabelProps={{
                shrink: material.measurement.name ? true : false,
              }}
            />
          </Stack>
          <Button
            onClick={() => navigate(-1)}
            variant="containedYellow"
            sx={{ width: "100%", padding: "10px 0", marginBottom: "20px" }}
          >
            Back
          </Button>
          <Button
            onClick={saveEdit}
            variant="containedBlue"
            sx={{ width: "100%", padding: "10px 0" }}
          >
            Save edit
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
