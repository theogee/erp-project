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

const regex = /^[0-9]*\.?[0-9]*$/;

const materialReducer = (prevMaterial, action) => {
  switch (action.type) {
    case "onchange-material-name":
      return { ...prevMaterial, name: action.payload.name };
    case "onchange-material-measurementName":
      return {
        ...prevMaterial,
        measurementName: action.payload.measurementName,
      };
    case "onchange-material-safetyStockQty":
      if (action.payload.safetyStockQty.match(regex))
        return {
          ...prevMaterial,
          safetyStockQty: action.payload.safetyStockQty,
        };
      break;
    default:
      break;
  }
  return prevMaterial;
};

const firstBatchReducer = (prevFirstBatch, action) => {
  switch (action.type) {
    case "onchange-firstBatch-qty":
      if (action.payload.qty.match(regex))
        return { ...prevFirstBatch, qty: action.payload.qty };
      break;
    case "onchange-firstBatch-purchasePrice":
      if (action.payload.purchasePrice.match(regex))
        return {
          ...prevFirstBatch,
          purchasePrice: action.payload.purchasePrice,
        };
      break;
    case "onchange-firstBatch-purchaseDate":
      return { ...prevFirstBatch, purchaseDate: action.payload.purchaseDate };
    case "onchange-firstBatch-expiryDate":
      return { ...prevFirstBatch, expiryDate: action.payload.expiryDate };
    default:
      break;
  }
  return prevFirstBatch;
};

export default function AddMaterial() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const [measurement, setMeasurement] = React.useState([]);
  const [isSafetyStockEnabled, setIsSafetyStockEnabled] = React.useState(true);

  const [material, materialDispatch] = React.useReducer(materialReducer, {});
  const [firstBatch, firstBatchDispatch] = React.useReducer(
    firstBatchReducer,
    {}
  );

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

  return (
    <Paper variant="customPaper">
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
        }}
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
          onChange={(e) =>
            firstBatchDispatch({
              type: "onchange-firstBatch-qty",
              payload: { qty: e.target.value },
            })
          }
          sx={{ flexGrow: 50 }}
          size="small"
        />
        <TextField
          select
          value={material.measurementName}
          onChange={(e) =>
            materialDispatch({
              type: "onchange-material-measurementName",
              payload: { measurementName: e.target.value },
            })
          }
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
        onChange={(e) =>
          firstBatchDispatch({
            type: "onchange-firstBatch-purchasePrice",
            payload: { purchasePrice: e.target.value },
          })
        }
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
        onChange={(e) =>
          firstBatchDispatch({
            type: "onchange-firstBatch-purchaseDate",
            payload: { purchaseDate: e.target.value },
          })
        }
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
        onChange={(e) =>
          firstBatchDispatch({
            type: "onchange-firstBatch-expiryDate",
            payload: { expiryDate: e.target.value },
          })
        }
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
          onChange={(e) =>
            materialDispatch({
              type: "onchange-material-safetyStockQty",
              payload: { safetyStockQty: e.target.value },
            })
          }
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
