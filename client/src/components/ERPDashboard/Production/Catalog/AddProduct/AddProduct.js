/** @jsxImportSource @emotion/react */
import React from "react";

import { useParams, useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import { ErrorDialog } from "../../../../lib/Dialog";

import {
  productReducer,
  productModel,
  getProductPayload,
  getProductMaterialPayload,
  validateProduct,
  sendProduct,
  sendProductMaterial,
  utils,
} from "../../../../lib/form";

export default function AddProduct(props) {
  const params = useParams();
  const navigate = useNavigate();

  const { productMaterials } = props;
  const [isErrorDialogOpen, setIsErrorDialogOpen] = React.useState(false);

  const [product, productDispatch] = React.useReducer(
    productReducer.inputs,
    productModel.inputs
  );

  const [errorProduct, errorProductDispatch] = React.useReducer(
    productReducer.errors,
    productModel.errors
  );

  const addProduct = async () => {
    if (productMaterials.length === 0) {
      setIsErrorDialogOpen(true);
      return;
    }

    const productPayload = getProductPayload(product, params.businessID);

    const productValidationReport = validateProduct(productPayload);

    const error = utils.checkError([productValidationReport]);

    if (error) {
      utils.showError([productValidationReport], [errorProductDispatch]);
      return;
    }

    try {
      const productID = await sendProduct(productPayload);

      const productMaterialsPayload = productMaterials.map((pm) => ({
        productID,
        materialID: pm.id,
        measurementID: pm.measurementID,
        qty: pm.qty,
      }));

      await sendProductMaterial({ materials: productMaterialsPayload });

      navigate(`/b/${params.businessID}/dashboard/production`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ minWidht: "600px", maxWidth: "40vw" }}>
      <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
        Adding Product...
      </h1>
      <Paper variant="customPaper" sx={{ padding: "30px" }}>
        <TextField
          value={product.name}
          required
          fullWidth
          onChange={(e) => {
            productDispatch({
              type: "onchange-product-name",
              payload: { name: e.target.value },
            });
            if (errorProduct.name.error) {
              utils.resetError("error-name", errorProductDispatch);
            }
          }}
          label="Product name"
          error={errorProduct.name.error}
          helperText={errorProduct.name.msg}
          size="small"
          sx={{ marginBottom: "30px" }}
        />
        <TextField
          value={product.price}
          label="Price/Unit"
          variant="outlined"
          color="black"
          required
          fullWidth
          onChange={(e) => {
            productDispatch({
              type: "onchange-product-price",
              payload: { price: e.target.value },
            });
            if (errorProduct.price.error) {
              utils.resetError("error-price", errorProductDispatch);
            }
          }}
          error={errorProduct.price.error}
          helperText={errorProduct.price.msg}
          size="small"
          sx={{ marginBottom: "30px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">IDR</InputAdornment>
            ),
          }}
        />
        <TextField
          value={product.productionProcess}
          label="Production Process"
          size="small"
          multiline
          minRows={3}
          fullWidth
          onChange={(e) => {
            productDispatch({
              type: "onchange-product-productionProcess",
              payload: { productionProcess: e.target.value },
            });
            if (errorProduct.productionProcess.error) {
              utils.resetError("error-productionProcess", errorProductDispatch);
            }
          }}
          error={errorProduct.productionProcess.error}
          helperText={errorProduct.productionProcess.msg}
          sx={{ marginBottom: "30px" }}
        />
        <Button
          onClick={addProduct}
          variant="containedBlue"
          sx={{ width: "100%", padding: "10px 0" }}
        >
          Add Product
        </Button>
      </Paper>
      <ErrorDialog
        isOpen={isErrorDialogOpen}
        title="Can not add product data."
        text="There must be at least one material added. Add a material and try again."
        onCancel={() => setIsErrorDialogOpen(false)}
      />
    </Box>
  );
}
