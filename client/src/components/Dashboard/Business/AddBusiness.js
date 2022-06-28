/** @jsxImportSource @emotion/react */
import { default as React, useReducer } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {
  businessReducer,
  businessModel,
  getBusinessPayload,
  validateBusiness,
  utils,
  sendBusiness,
} from "../../lib/form";

export default function AddBusiness() {
  const navigate = useNavigate();

  const [business, businessDispatch] = useReducer(
    businessReducer.inputs,
    businessModel.inputs
  );

  const [errorBusiness, errorBusinessDispatch] = useReducer(
    businessReducer.errors,
    businessModel.errors
  );

  const addBusiness = async () => {
    const businessPayload = getBusinessPayload(business);

    const businessValidationReport = validateBusiness(businessPayload);

    const error = utils.checkError([businessValidationReport]);

    if (error) {
      utils.showError([businessValidationReport], [errorBusinessDispatch]);
      return;
    }

    try {
      await sendBusiness(businessPayload);
      navigate("/dashboard/business");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box component="section">
      <h1
        css={{
          paddingLeft: "18px",
          borderLeft: "5px solid #4AF48E",
          marginBottom: "42px",
        }}
      >
        Add Your Business
      </h1>
      <Paper
        component="form"
        autoComplete="off"
        variant="outlined"
        sx={{ width: "457px", height: "230px", padding: "21px 24px" }}
      >
        <Stack justifyContent="space-between" sx={{ height: "100%" }}>
          <TextField
            id="outlined-basic"
            label="Your business name"
            value={business.name}
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              businessDispatch({
                type: "onchange-business-name",
                payload: { name: e.target.value },
              });
              if (errorBusiness.name.error) {
                utils.resetError("error-name", errorBusinessDispatch);
              }
            }}
            error={errorBusiness.name.error}
            helperText={errorBusiness.name.msg}
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="Your business address"
            value={business.address}
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              businessDispatch({
                type: "onchange-business-address",
                payload: { address: e.target.value },
              });
              if (errorBusiness.address.error) {
                utils.resetError("error-address", errorBusinessDispatch);
              }
            }}
            error={errorBusiness.address.error}
            helperText={errorBusiness.address.msg}
            size="small"
          />
          <Button
            variant="containedGreen"
            sx={{ padding: "10px 155px" }}
            onClick={addBusiness}
          >
            Add Business
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
