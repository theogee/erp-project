import React from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { isAlphanumeric, isMobilePhone } from "validator";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const regex = /^[0-9]*$/;

const supplierReducer = (prevSupplier, action) => {
  switch (action.type) {
    case "onchange-supplier-name":
      return { ...prevSupplier, name: action.payload.name };
    case "onchange-supplier-address":
      return { ...prevSupplier, address: action.payload.address };
    case "onchange-supplier-telp":
      if (action.payload.telp.match(regex))
        return {
          ...prevSupplier,
          telp: action.payload.telp,
        };
      break;
    default:
      break;
  }
  return prevSupplier;
};

const errorSupplierReducer = (prevErrorSupplier, action) => {
  switch (action.type) {
    case "error-name":
      console.log("error-name triggered");
      return {
        ...prevErrorSupplier,
        name: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-address":
      console.log("error-address triggered");
      return {
        ...prevErrorSupplier,
        address: { error: action.payload.error, msg: action.payload.msg },
      };
    case "error-telp":
      console.log("error-telp triggered");
      return {
        ...prevErrorSupplier,
        telp: { error: action.payload.error, msg: action.payload.msg },
      };
    default:
      break;
  }
  console.log("return prev errorSupplier state???");
  return prevErrorSupplier;
};

export default function AddSupplier(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const params = useParams();

  const [supplier, supplierDispatch] = React.useReducer(supplierReducer, {
    name: "",
    address: "",
    telp: "",
  });

  const [errorSupplier, errorSupplierDispatch] = React.useReducer(
    errorSupplierReducer,
    {
      name: { error: false, msg: "" },
      address: { error: false, msg: "" },
      telp: { error: false, msg: "" },
    }
  );

  const getSupplierPayload = () => {
    return {
      businessID: params.businessID,
      name: supplier.name,
      address: supplier.address,
      telp: supplier.telp,
    };
  };

  const validateSupplier = (payload) => {
    const errorMsg = { name: "", address: "", telp: "" };

    if (payload.name) {
      if (!isAlphanumeric(payload.name, "en-US", { ignore: " /.,&()" }))
        errorMsg.name =
          "Supplier name can only consist of a-z, 0-9, spaces, and /.,&().";
    } else {
      errorMsg.name = "Supplier name can't be empty.";
    }

    if (payload.address) {
      if (!isAlphanumeric(payload.address, "en-US", { ignore: " /.,&()" }))
        errorMsg.address =
          "Address can only consist of a-z, 0-9, spaces, and /.,&().";
    } else {
      errorMsg.address = "Address can't be empty.";
    }

    if (payload.telp) {
      if (!isMobilePhone(payload.telp, "id-ID"))
        errorMsg.telp = "Invalid phone number.";
    } else {
      errorMsg.telp = "Telp. can't be empty.";
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

  const sendSupplier = async (payload) => {
    const { data } = await axios.post(SERVER_URL + "/api/supplier", payload, {
      withCredentials: true,
    });

    if (!data.success) throw new Error("Something went wrong.");

    return data.success;
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

  const resetErrorSupplier = (action) => {
    errorSupplierDispatch({
      type: action,
      payload: { error: false, msg: "" },
    });
  };

  const addSupplier = async () => {
    const supplierPayload = getSupplierPayload();

    const supplierValidationReport = validateSupplier(supplierPayload);

    const error = checkError([supplierValidationReport]);

    if (error) {
      showError([supplierValidationReport], [errorSupplierDispatch]);
      return;
    }

    try {
      await sendSupplier(supplierPayload);

      props.closeView({
        isOpen: true,
        severity: "success",
        variant: "darkSuccess",
        msg: "New supplier added!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper variant="customPaper" sx={{ padding: "30px" }}>
      <TextField
        value={supplier.name}
        label="Supplier name"
        variant="outlined"
        color="black"
        required
        fullWidth
        onChange={(e) => {
          supplierDispatch({
            type: "onchange-supplier-name",
            payload: { name: e.target.value },
          });
          if (errorSupplier.name.error) resetErrorSupplier("error-name");
        }}
        error={errorSupplier.name.error}
        helperText={errorSupplier.name.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <TextField
        value={supplier.address}
        label="Address"
        variant="outlined"
        color="black"
        required
        fullWidth
        onChange={(e) => {
          supplierDispatch({
            type: "onchange-supplier-address",
            payload: { address: e.target.value },
          });
          if (errorSupplier.address.error) resetErrorSupplier("error-address");
        }}
        error={errorSupplier.address.error}
        helperText={errorSupplier.address.msg}
        multiline
        minRows={2}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <TextField
        value={supplier.telp}
        label="telp"
        variant="outlined"
        color="black"
        required
        fullWidth
        onChange={(e) => {
          supplierDispatch({
            type: "onchange-supplier-telp",
            payload: { telp: e.target.value },
          });
          if (errorSupplier.telp.error) resetErrorSupplier("error-telp");
        }}
        error={errorSupplier.telp.error}
        helperText={errorSupplier.telp.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <Button
        onClick={addSupplier}
        variant="containedBlue"
        sx={{ width: "100%", padding: "10px 0" }}
      >
        Add supplier
      </Button>
    </Paper>
  );
}
