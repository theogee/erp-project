/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import {
  materialReducer,
  batchReducer,
  materialModel,
  batchModel,
  getMaterialPayload,
  getBatchPayload,
  validateMaterial,
  validateBatch,
  utils,
  sendMaterial,
  sendBatch,
} from "../../../lib/form";

import { TopBorderCard } from "../../../lib/Cards";

export default function AddMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [measurement, setMeasurement] = React.useState([]);
  const [supplier, setSupplier] = React.useState([]);
  const [isSafetyStockEnabled, setIsSafetyStockEnabled] = React.useState(true);

  const [material, materialDispatch] = React.useReducer(
    materialReducer.inputs,
    materialModel.inputs
  );
  const [firstBatch, firstBatchDispatch] = React.useReducer(
    batchReducer.inputs,
    batchModel.inputs
  );

  const [errorMaterial, errorMaterialDispatch] = React.useReducer(
    materialReducer.errors,
    materialModel.errors
  );
  const [errorFirstBatch, errorFirstBatchDispatch] = React.useReducer(
    batchReducer.errors,
    batchModel.errors
  );

  React.useEffect(() => {
    (async () => {
      try {
        const getMeasurement = () => {
          return axios.get(SERVER_URL + `/api/measurement`, {
            withCredentials: true,
          });
        };

        const getSupplier = () => {
          return axios.get(
            SERVER_URL + `/api/supplier?businessID=${params.businessID}`,
            { withCredentials: true }
          );
        };

        const [{ data: measurementData }, { data: supplierData }] =
          await Promise.all([getMeasurement(), getSupplier()]);

        setMeasurement(measurementData.data);
        setSupplier(supplierData.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const addMaterial = async () => {
    // check input -> if error show error
    // send request -> if error show error
    //              -> if success back to inspecting
    const materialPayload = getMaterialPayload(
      material,
      params.businessID,
      isSafetyStockEnabled
    );
    const firstBatchPayload = getBatchPayload(firstBatch);

    const materialValidationReport = validateMaterial(
      materialPayload,
      isSafetyStockEnabled
    );
    const firstBatchValidationReport = validateBatch(firstBatchPayload);

    const error = utils.checkError([
      materialValidationReport,
      firstBatchValidationReport,
    ]);

    if (error) {
      // update UI to show error on inputs
      utils.showError(
        [materialValidationReport, firstBatchValidationReport],
        [errorMaterialDispatch, errorFirstBatchDispatch]
      );
      return;
    }

    // send network request
    try {
      const materialID = await sendMaterial(materialPayload);
      await sendBatch({ ...firstBatchPayload, materialID });

      // 100% success

      props.closeView({
        isOpen: true,
        severity: "success",
        variant: "darkSuccess",
        msg: "New material added!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {supplier.length === 0 ? (
        <TopBorderCard
          text="You currently don't have any supplier registered. Add supplier to get
    started."
        />
      ) : (
        <Paper variant="customPaper" sx={{ padding: "30px" }}>
          <TextField
            select
            value={firstBatch.supplier.name}
            required
            fullWidth
            onChange={(e, child) => {
              firstBatchDispatch({
                type: "onchange-firstBatch-supplier",
                payload: { id: child.props.id, name: e.target.value },
              });
              if (errorFirstBatch.supplier.error) {
                utils.resetError("error-supplier", errorFirstBatchDispatch);
              }
            }}
            label="Supplier name"
            error={errorFirstBatch.supplier.error}
            helperText={errorFirstBatch.supplier.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
          >
            {supplier.map((option) => (
              <MenuItem
                id={option.supplier_id}
                key={option.supplier_id}
                value={option.name}
              >
                {option.name}
              </MenuItem>
            ))}
          </TextField>
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
          <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
            <TextField
              value={firstBatch.qty}
              label="Qty"
              variant="outlined"
              color="black"
              required
              onChange={(e) => {
                firstBatchDispatch({
                  type: "onchange-firstBatch-qty",
                  payload: { qty: e.target.value },
                });
                if (errorFirstBatch.qty.error) {
                  utils.resetError("error-qty", errorFirstBatchDispatch);
                }
              }}
              error={errorFirstBatch.qty.error}
              helperText={errorFirstBatch.qty.msg}
              sx={{ flexGrow: 50 }}
              size="small"
            />
            <TextField
              select
              value={material.measurement.name}
              onChange={(e, child) => {
                materialDispatch({
                  type: "onchange-material-measurement",
                  payload: { id: child.props.id, name: e.target.value },
                });
                if (errorMaterial.measurement.error) {
                  utils.resetError("error-measurement", errorMaterialDispatch);
                }
              }}
              error={errorMaterial.measurement.error}
              helperText={errorMaterial.measurement.msg}
              label="Measurement"
              sx={{ flexGrow: 40 }}
              size="small"
            >
              {measurement.map((option) => (
                <MenuItem
                  id={option.measurement_id}
                  key={option.measurement_id}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <TextField
            value={firstBatch.purchasePrice}
            label="Purchase Price"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              firstBatchDispatch({
                type: "onchange-firstBatch-purchasePrice",
                payload: { purchasePrice: e.target.value },
              });
              if (errorFirstBatch.purchasePrice.error) {
                utils.resetError(
                  "error-purchasePrice",
                  errorFirstBatchDispatch
                );
              }
            }}
            error={errorFirstBatch.purchasePrice.error}
            helperText={errorFirstBatch.purchasePrice.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">IDR</InputAdornment>
              ),
            }}
          />
          <TextField
            value={firstBatch.purchaseDate}
            label="Purchase Date"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              firstBatchDispatch({
                type: "onchange-firstBatch-purchaseDate",
                payload: { purchaseDate: e.target.value },
              });
              if (errorFirstBatch.purchaseDate.error) {
                utils.resetError("error-purchaseDate", errorFirstBatchDispatch);
              }
            }}
            error={errorFirstBatch.purchaseDate.error}
            helperText={errorFirstBatch.purchaseDate.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={firstBatch.expiryDate}
            label="Expiry Date"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              firstBatchDispatch({
                type: "onchange-firstBatch-expiryDate",
                payload: { expiryDate: e.target.value },
              });
              if (errorFirstBatch.expiryDate.error) {
                utils.resetError("error-expiryDate", errorFirstBatchDispatch);
              }
            }}
            error={errorFirstBatch.expiryDate.error}
            helperText={errorFirstBatch.expiryDate.msg}
            size="small"
            sx={{ marginBottom: "20px" }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <Stack
            direction="row"
            alignItems="center"
            sx={{ marginBottom: "20px" }}
          >
            <Checkbox
              defaultChecked
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
            onClick={addMaterial}
            variant="containedBlue"
            sx={{ width: "100%", padding: "10px 0" }}
          >
            Add material
          </Button>
        </Paper>
      )}
    </>
  );
}
