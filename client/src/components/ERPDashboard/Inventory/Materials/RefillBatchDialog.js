import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

import {
  batchReducer,
  batchModel,
  getBatchPayload,
  validateBatch,
  utils,
  sendBatch,
} from "../../../lib/form";

export default function RefillBatchDialog(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [supplier, setSupplier] = React.useState([]);

  const [batch, batchDispatch] = React.useReducer(
    batchReducer.inputs,
    batchModel.inputs
  );
  const [errorBatch, errorBatchDispatch] = React.useReducer(
    batchReducer.errors,
    batchModel.errors
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/supplier?businessID=${params.businessID}`,
          { withCredentials: true }
        );
        setSupplier(data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const closePopup = () => {
    props.onCancel();
    batchDispatch({ type: "reset" });
    errorBatchDispatch({ type: "reset" });
  };

  const refillMaterial = async () => {
    const batchPayload = getBatchPayload(batch);
    const batchValidationReport = validateBatch(batchPayload);
    const error = utils.checkError([batchValidationReport]);

    if (error) {
      utils.showError([batchValidationReport], [errorBatchDispatch]);
      return;
    }

    try {
      await sendBatch({
        ...batchPayload,
        materialID: props.inspectedMaterial.material_id,
      });

      props.refresh();
      closePopup();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ padding: "30px" }}
        scroll="body"
      >
        <DialogTitle id="alert-dialog-title">Refill Material</DialogTitle>
        <DialogContent>
          <TextField
            select
            value={batch.supplier.name}
            required
            fullWidth
            onChange={(e, child) => {
              batchDispatch({
                type: "onchange-firstBatch-supplier",
                payload: { id: child.props.id, name: e.target.value },
              });
              if (errorBatch.supplier.error)
                utils.resetError("error-supplier", errorBatchDispatch);
            }}
            label="Supplier name"
            error={errorBatch.supplier.error}
            helperText={errorBatch.supplier.msg}
            size="small"
            sx={{ marginBottom: "30px", marginTop: "10px" }}
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
            value={props.inspectedMaterial?.name}
            label="Material name"
            variant="outlined"
            color="black"
            disabled
            fullWidth
            size="small"
            sx={{ marginBottom: "30px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
            <TextField
              value={batch.qty}
              label="Qty"
              variant="outlined"
              color="black"
              required
              onChange={(e) => {
                batchDispatch({
                  type: "onchange-firstBatch-qty",
                  payload: { qty: e.target.value },
                });
                if (errorBatch.qty.error)
                  utils.resetError("error-qty", errorBatchDispatch);
              }}
              error={errorBatch.qty.error}
              helperText={errorBatch.qty.msg}
              sx={{ flexGrow: 50 }}
              size="small"
            />
            <TextField
              value={props.inspectedMaterial?.measurement_name}
              disabled
              label="Measurement"
              sx={{ flexGrow: 40 }}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <TextField
            value={batch.purchasePrice}
            label="Purchase Price"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              batchDispatch({
                type: "onchange-firstBatch-purchasePrice",
                payload: { purchasePrice: e.target.value },
              });
              if (errorBatch.purchasePrice.error)
                utils.resetError("error-purchasePrice", errorBatchDispatch);
            }}
            error={errorBatch.purchasePrice.error}
            helperText={errorBatch.purchasePrice.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">IDR</InputAdornment>
              ),
            }}
          />
          <TextField
            value={batch.purchaseDate}
            label="Purchase Date"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              batchDispatch({
                type: "onchange-firstBatch-purchaseDate",
                payload: { purchaseDate: e.target.value },
              });
              if (errorBatch.purchaseDate.error)
                utils.resetError("error-purchaseDate", errorBatchDispatch);
            }}
            error={errorBatch.purchaseDate.error}
            helperText={errorBatch.purchaseDate.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={batch.expiryDate}
            label="Expiry Date"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              batchDispatch({
                type: "onchange-firstBatch-expiryDate",
                payload: { expiryDate: e.target.value },
              });
              if (errorBatch.expiryDate.error)
                utils.resetError("error-expiryDate", errorBatchDispatch);
            }}
            error={errorBatch.expiryDate.error}
            helperText={errorBatch.expiryDate.msg}
            size="small"
            sx={{ marginBottom: "20px" }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="containedYellow"
            sx={{ width: "100%", padding: "10px 0", marginBottom: "20px" }}
            onClick={closePopup}
          >
            Cancel
          </Button>
          <Button
            onClick={refillMaterial}
            variant="containedBlue"
            sx={{ width: "100%", padding: "10px 0" }}
          >
            Refill material
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
