/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { isAlphanumeric, isDecimal } from "validator";

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
    case "onchange-material-measurement":
      return {
        ...prevMaterial,
        measurement: { id: action.payload.id, name: action.payload.name },
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
    case "onchange-firstBatch-supplier":
      return {
        ...prevFirstBatch,
        supplier: { id: action.payload.id, name: action.payload.name },
      };
    default:
      break;
  }
  return prevFirstBatch;
};

const errorMaterialReducer = (prevErrorMaterial, action) => {
  switch (action.type) {
    case "error-name":
      return {
        ...prevErrorMaterial,
        name: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-measurement":
      return {
        ...prevErrorMaterial,
        measurement: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-safetyStockQty":
      return {
        ...prevErrorMaterial,
        safetyStockQty: {
          error: action.payload.error,
          msg: action.payload.msg,
        },
      };
    default:
      break;
  }
  return prevErrorMaterial;
};

const errorFirstBatchReducer = (prevErrorFirstBatch, action) => {
  switch (action.type) {
    case "error-qty":
      return {
        ...prevErrorFirstBatch,
        qty: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-purchasePrice":
      return {
        ...prevErrorFirstBatch,
        purchasePrice: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-purchaseDate":
      return {
        ...prevErrorFirstBatch,
        purchaseDate: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-expiryDate":
      return {
        ...prevErrorFirstBatch,
        expiryDate: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-supplier":
      return {
        ...prevErrorFirstBatch,
        supplier: { error: action.payload.error, msg: action.payload.msg },
      };
    default:
      break;
  }
  return prevErrorFirstBatch;
};

export default function AddMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [measurement, setMeasurement] = React.useState([]);
  const [supplier, setSupplier] = React.useState([]);
  const [isSafetyStockEnabled, setIsSafetyStockEnabled] = React.useState(true);

  const [material, materialDispatch] = React.useReducer(materialReducer, {
    name: "",
    measurement: { id: "", name: "" },
    safetyStockQty: "",
  });
  const [firstBatch, firstBatchDispatch] = React.useReducer(firstBatchReducer, {
    qty: "",
    purchasePrice: "",
    purchaseDate: "",
    expiryDate: "",
    supplier: { id: "", name: "" },
  });

  const [errorMaterial, errorMaterialDispatch] = React.useReducer(
    errorMaterialReducer,
    {
      name: { error: false, msg: "" },
      measurement: { error: false, msg: "" },
      safetyStockQty: { error: false, msg: "" },
    }
  );
  const [errorFirstBatch, errorFirstBatchDispatch] = React.useReducer(
    errorFirstBatchReducer,
    {
      qty: { error: false, msg: "" },
      purchasePrice: { error: false, msg: "" },
      purchaseDate: { error: false, msg: "" },
      expiryDate: { error: false, msg: "" },
      supplier: { error: false, msg: "" },
    }
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

  const getMaterialPayload = () => {
    const payload = {
      businessID: params.businessID,
      measurementID: material.measurement.id,
      name: material.name,
    };

    if (isSafetyStockEnabled) payload.safetyStockQty = material.safetyStockQty;

    return payload;
  };

  const getFirstBatchPayload = () => {
    return {
      supplierID: firstBatch.supplier.id,
      purchaseQty: firstBatch.qty,
      currentQty: firstBatch.qty,
      pricePerUnit: firstBatch.purchasePrice / firstBatch.qty,
      purchasePrice: firstBatch.purchasePrice,
      purchaseDate: firstBatch.purchaseDate,
      expiryDate: firstBatch.expiryDate,
    };
  };

  const validateMaterial = (payload) => {
    const errorMsg = { name: "", measurement: "", safetyStockQty: "" };

    if (payload.name) {
      if (!isAlphanumeric(payload.name, "en-US", { ignore: " " }))
        errorMsg.name = "Material name can only consist a-z, 0-9, and spaces.";
    } else {
      errorMsg.name = "Material name can't be empty.";
    }

    if (!payload.measurementID) {
      errorMsg.measurement = "Measurement can't be empty.";
    }

    if (isSafetyStockEnabled) {
      if (payload.safetyStockQty) {
        if (!isDecimal(payload.safetyStockQty))
          errorMsg.safetyStockQty = "Qty can only consist 0-9, and dots.";
      } else {
        errorMsg.safetyStockQty = "Qty can't be empty.";
      }
    }

    return errorMsg;
  };

  const validateFirstBatch = (payload) => {
    const errorMsg = {
      qty: "",
      purchasePrice: "",
      purchaseDate: "",
      expiryDate: "",
      supplier: "",
    };

    if (payload.purchaseQty) {
      if (!isDecimal(payload.purchaseQty))
        errorMsg.qty = "Qty can only consist 0-9, and dots.";
    } else {
      errorMsg.qty = "Qty can't be empty.";
    }

    if (payload.purchasePrice) {
      if (!isDecimal(payload.purchasePrice))
        errorMsg.purchasePrice = "Price can only consist 0-9, and dots.";
    } else {
      errorMsg.purchasePrice = "Purchase price can't be empty.";
    }

    if (!payload.purchaseDate) {
      errorMsg.purchaseDate = "Purchase date can't be empty.";
    }

    if (!payload.expiryDate) {
      errorMsg.expiryDate = "Expiry date can't be empty.";
    }

    if (!payload.supplierID) {
      errorMsg.supplier = "Supplier can't be empty.";
    }

    return errorMsg;
  };

  const checkError = (validationReports) => {
    for (const report of validationReports) {
      for (const prop in report) {
        if (report[prop]) return true;
      }
    }

    return false;
  };

  const sendMaterial = async (payload) => {
    const { data } = await axios.post(SERVER_URL + "/api/material", payload, {
      withCredentials: true,
    });

    if (!data.success) throw new Error("Something went wrong.");

    return data.data.material_id;
  };

  const sendFirstBatch = async (payload) => {
    const { data } = await axios.post(SERVER_URL + "/api/batches", payload, {
      withCredentials: true,
    });

    if (!data.success) throw new Error("Something went wrong.");
  };

  const showError = (reports, dispatchers) => {
    for (let i = 0; i < reports.length; i++) {
      for (const prop in reports[i]) {
        if (reports[i][prop]) {
          dispatchers[i]({
            type: `error-${prop}`,
            payload: {
              error: true,
              msg: reports[i][prop],
            },
          });
        }
      }
    }
  };

  const addMaterial = async () => {
    // check input -> if error show error
    // send request -> if error show error
    //              -> if success back to inspecting
    const materialPayload = getMaterialPayload();
    const firstBatchPayload = getFirstBatchPayload();

    const materialValidationReport = validateMaterial(materialPayload);
    const firstBatchValidationReport = validateFirstBatch(firstBatchPayload);

    const error = checkError([
      materialValidationReport,
      firstBatchValidationReport,
    ]);

    if (error) {
      // update UI to show error on inputs
      showError(
        [materialValidationReport, firstBatchValidationReport],
        [errorMaterialDispatch, errorFirstBatchDispatch]
      );
      return;
    }

    // send network request
    try {
      const materialID = await sendMaterial(materialPayload);
      await sendFirstBatch({ ...firstBatchPayload, materialID });

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
          errorFirstBatchDispatch({
            type: "error-supplier",
            payload: { error: false, msg: "" },
          });
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
          errorMaterialDispatch({
            type: "error-name",
            payload: { error: false, msg: "" },
          });
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
            errorFirstBatchDispatch({
              type: "error-qty",
              payload: { error: false, msg: "" },
            });
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
            errorMaterialDispatch({
              type: "error-measurement",
              payload: { error: false, msg: "" },
            });
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
          errorFirstBatchDispatch({
            type: "error-purchasePrice",
            payload: { error: false, msg: "" },
          });
        }}
        error={errorFirstBatch.purchasePrice.error}
        helperText={errorFirstBatch.purchasePrice.msg}
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
        onChange={(e) => {
          firstBatchDispatch({
            type: "onchange-firstBatch-purchaseDate",
            payload: { purchaseDate: e.target.value },
          });
          errorFirstBatchDispatch({
            type: "error-purchaseDate",
            payload: { error: false, msg: "" },
          });
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
          errorFirstBatchDispatch({
            type: "error-expiryDate",
            payload: { error: false, msg: "" },
          });
        }}
        error={errorFirstBatch.expiryDate.error}
        helperText={errorFirstBatch.expiryDate.msg}
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
          onChange={() => {
            setIsSafetyStockEnabled(!isSafetyStockEnabled);
            errorMaterialDispatch({
              type: "error-safetyStockQty",
              payload: { error: false, msg: "" },
            });
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
            errorMaterialDispatch({
              type: "error-safetyStockQty",
              payload: { error: false, msg: "" },
            });
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
          InputLabelProps={{ shrink: material.measurement.name ? true : false }}
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
  );
}
