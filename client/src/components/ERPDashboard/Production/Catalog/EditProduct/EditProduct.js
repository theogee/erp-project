/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

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

export default function EditProduct(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
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

  React.useEffect(() => {
    if (props.product.name) {
      productDispatch({
        type: "onchange-product-name",
        payload: { name: props.product.name },
      });
      productDispatch({
        type: "onchange-product-price",
        payload: { price: props.product.price + "" },
      });
      productDispatch({
        type: "onchange-product-productionProcess",
        payload: { productionProcess: props.product.production_process },
      });
    }
  }, [props.product]);

  const editProduct = async () => {
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
      const productMaterialsPayload = productMaterials.map((pm) => ({
        productID: params.productID,
        materialID: pm.id,
        measurementID: pm.measurementID,
        qty: pm.qty,
      }));

      await Promise.all([
        axios.put(
          SERVER_URL + `/api/product/${params.productID}`,
          productPayload,
          { withCredentials: true }
        ),
        axios.put(
          SERVER_URL + `/api/product_material`,
          { materials: productMaterialsPayload },
          { withCredentials: true }
        ),
      ]);

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
          onClick={() => navigate(-1)}
          variant="containedYellow"
          sx={{ width: "100%", padding: "10px 0", marginBottom: "20px" }}
        >
          Back
        </Button>
        <Button
          onClick={editProduct}
          variant="containedBlue"
          sx={{ width: "100%", padding: "10px 0" }}
        >
          Save Edit
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
