/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useParams, useNavigate } from "react-router-dom";

import {
  supplierReducer,
  supplierModel,
  getSupplierPayload,
  validateSupplier,
  utils,
} from "../../lib/form";

export default function EditSupplier() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const params = useParams();
  const navigate = useNavigate();

  const [supplier, supplierDispatch] = React.useReducer(
    supplierReducer.inputs,
    supplierModel.inputs
  );

  const [errorSupplier, errorSupplierDispatch] = React.useReducer(
    supplierReducer.errors,
    supplierModel.errors
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data: supplierData } = await axios.get(
          SERVER_URL + `/api/supplier/${params.supplierID}`,
          {
            withCredentials: true,
          }
        );

        supplierDispatch({
          type: "onchange-supplier-name",
          payload: { name: supplierData.data[0].name },
        });

        supplierDispatch({
          type: "onchange-supplier-address",
          payload: { address: supplierData.data[0].address },
        });

        supplierDispatch({
          type: "onchange-supplier-telp",
          payload: { telp: supplierData.data[0].telp },
        });
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const editSupplier = async () => {
    const supplierPayload = getSupplierPayload(supplier, params.businessID);

    const supplierValidationReport = validateSupplier(supplierPayload);

    const error = utils.checkError([supplierValidationReport]);

    if (error) {
      utils.showError([supplierValidationReport], [errorSupplierDispatch]);
      return;
    }

    try {
      await axios.put(
        SERVER_URL + `/api/supplier/${params.supplierID}`,
        supplierPayload,
        { withCredentials: true }
      );

      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F3F3F3" }}>
      <Box sx={{ width: "50%" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          Editing Supplier...
        </h1>
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
            onClick={() => navigate(-1)}
            variant="containedYellow"
            sx={{ width: "100%", padding: "10px 0", marginBottom: "20px" }}
          >
            Back
          </Button>
          <Button
            onClick={editSupplier}
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
