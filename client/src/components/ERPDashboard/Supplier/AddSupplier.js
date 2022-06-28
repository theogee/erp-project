import React from "react";

import { useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {
  supplierReducer,
  supplierModel,
  getSupplierPayload,
  validateSupplier,
  utils,
  sendSupplier,
} from "../../lib/form";

export default function AddSupplier(props) {
  const params = useParams();

  const [supplier, supplierDispatch] = React.useReducer(
    supplierReducer.inputs,
    supplierModel.inputs
  );

  const [errorSupplier, errorSupplierDispatch] = React.useReducer(
    supplierReducer.errors,
    supplierModel.errors
  );

  const addSupplier = async () => {
    const supplierPayload = getSupplierPayload(supplier, params.businessID);

    const supplierValidationReport = validateSupplier(supplierPayload);

    const error = utils.checkError([supplierValidationReport]);

    if (error) {
      utils.showError([supplierValidationReport], [errorSupplierDispatch]);
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
          if (errorSupplier.name.error) {
            utils.resetError("error-name", errorSupplierDispatch);
          }
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
          if (errorSupplier.address.error) {
            utils.resetError("error-address", errorSupplierDispatch);
          }
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
          if (errorSupplier.telp.error) {
            utils.resetError("error-telp", errorSupplierDispatch);
          }
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
