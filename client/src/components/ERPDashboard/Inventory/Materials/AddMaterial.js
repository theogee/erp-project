/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function AddMaterial() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const [measurement, setMeasurement] = React.useState([]);
  const [material, setMaterial] = React.useState({});
  const [firstBatch, setFirstBatch] = React.useState({});

  const [isSafetyStockEnabled, setIsSafetyStockEnabled] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + `/api/measurement`, {
          withCredentials: true,
        });
        setMeasurement(data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const regex = /^[0-9]*\.?[0-9]*$/;

  const onChangeMaterialName = (e) => {
    setMaterial((material) => ({ ...material, name: e.target.value }));
  };

  const onChangeFirstBatchQty = (e) => {
    if (e.target.value.match(regex))
      setFirstBatch((firstBatch) => ({ ...firstBatch, qty: e.target.value }));
  };

  const onChangeMaterialMeasurement = (e) => {
    console.log(e.target.value);
    setMaterial((material) => ({
      ...material,
      measurementName: e.target.value,
    }));
  };

  const onChangeFirstBatchPurchasePrice = (e) => {
    if (e.target.value.match(regex))
      setFirstBatch((firstBatch) => ({
        ...firstBatch,
        purchasePrice: e.target.value,
      }));
  };

  const onChangeFirstBatchPurchaseDate = (e) => {
    setFirstBatch((firstBatch) => ({
      ...firstBatch,
      purchaseDate: e.target.value,
    }));
  };

  const onChangeFirstBatchExpiryDate = (e) => {
    setFirstBatch((firstBatch) => ({
      ...firstBatch,
      expiryDate: e.target.value,
    }));
  };

  const onChangeMaterialSafetyStockQty = (e) => {
    if (e.target.value.match(regex))
      setMaterial((material) => ({
        ...material,
        safetyStockQty: e.target.value,
      }));
  };

  return (
    <Paper variant="customPaper">
      <TextField
        value={material.name}
        label="Material name"
        variant="outlined"
        color="black"
        required
        fullWidth
        onChange={onChangeMaterialName}
        size="small"
        sx={{ margin: "15px 0 30px 0" }}
      />
      <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
        <TextField
          value={firstBatch.qty}
          label="Qty"
          variant="outlined"
          color="black"
          required
          onChange={onChangeFirstBatchQty}
          sx={{ flexGrow: 50 }}
          size="small"
        />
        <TextField
          select
          value={material.measurementName}
          onChange={onChangeMaterialMeasurement}
          label="Measurement"
          sx={{ flexGrow: 40 }}
          size="small"
        >
          {measurement.map((option) => (
            <MenuItem key={option.measurement_id} value={option.name}>
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
        onChange={onChangeFirstBatchPurchasePrice}
        size="small"
        sx={{ marginBottom: "30px" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">IDR</InputAdornment>,
        }}
      />
      <TextField
        value={firstBatch.purchaseDate}
        label="Purchase Date"
        variant="outlined"
        color="black"
        required
        fullWidth
        onChange={onChangeFirstBatchPurchaseDate}
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
        onChange={onChangeFirstBatchExpiryDate}
        size="small"
        sx={{ marginBottom: "20px" }}
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <Stack direction="row" alignItems="center" sx={{ marginBottom: "20px" }}>
        <Checkbox
          defaultChecked
          color="black"
          size="small"
          onChange={() => setIsSafetyStockEnabled(!isSafetyStockEnabled)}
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
          onChange={onChangeMaterialSafetyStockQty}
          sx={{ flexGrow: 50 }}
          size="small"
          disabled={!isSafetyStockEnabled}
        />
        <TextField
          value={material.measurementName}
          disabled
          label="Measurement"
          sx={{ flexGrow: 40 }}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
      <Button variant="containedBlue" sx={{ width: "100%", padding: "10px 0" }}>
        Add material
      </Button>
    </Paper>
  );
}
