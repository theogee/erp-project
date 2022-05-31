/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import {
  materialReducer,
  batchReducer,
  productMaterialReducer,
  materialModel,
  batchModel,
  productMaterialModel,
  getMaterialPayload,
  getBatchPayload,
  getProductMaterialPayload,
  validateMaterial,
  validateBatch,
  validateProductMaterial,
  utils,
  sendMaterial,
  sendBatch,
  sendProductMaterial,
} from "../../lib/form";

import { GeeTable } from "../../GeeComponents";

export default function AddMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [measurement, setMeasurement] = React.useState([]);
  const [supplier, setSupplier] = React.useState([]);
  const [isSafetyStockEnabled, setIsSafetyStockEnabled] = React.useState(true);
  const [product, setProduct] = React.useState({});
  const [mtrl, setMaterial] = React.useState([]);
  const [productMaterials, setProductMaterials] = React.useState([]);
  const [checkedMaterialID, setCheckedMaterialID] = React.useState(0);

  const [material, materialDispatch] = React.useReducer(
    materialReducer.inputs,
    materialModel.inputs
  );
  const [firstBatch, firstBatchDispatch] = React.useReducer(
    batchReducer.inputs,
    batchModel.inputs
  );

  const [productMaterial, productMaterialDispatch] = React.useReducer(
    productMaterialReducer.inputs,
    productMaterialModel.inputs
  );

  const [errorMaterial, errorMaterialDispatch] = React.useReducer(
    materialReducer.errors,
    materialModel.errors
  );
  const [errorFirstBatch, errorFirstBatchDispatch] = React.useReducer(
    batchReducer.errors,
    batchModel.errors
  );

  const [errorProductMaterial, errorProductMaterialDispatch] = React.useReducer(
    productMaterialReducer.errors,
    productMaterialModel.errors
  );

  const addMaterialToProduct = () => {
      const productMaterialPayload = getProductMaterialPayload(
          productMaterial,
          "",          
      );

      const productMaterialValidationReport = validateProductMaterial(productMaterialPayload);
        console.log(productMaterialValidationReport)
      const error = utils.checkError([
          productMaterialValidationReport
      ]);

      if (error) {
          utils.showError(
              [productMaterialValidationReport],
              [errorProductMaterialDispatch]
          );
          return;
      };

    if (productMaterials.length === 0)
      setCheckedMaterialID(productMaterial.material.id);
    setProductMaterials((prevProductMaterials) => {
      return [
        ...prevProductMaterials,
        {
          id: productMaterial.material.id,
          name: productMaterial.material.name,
          qty: productMaterial.qty,
          measurement: productMaterial.measurement.name,
        },
      ];
    });

    productMaterialDispatch({
      type: "onchange-productMaterial-material",
      payload: { id: "", name: "" },
    });
    productMaterialDispatch({
      type: "onchange-productMaterial-qty",
      payload: { qty: "" },
    });
    productMaterialDispatch({
      type: "onchange-productMaterial-measurement",
      payload: { id: "", name: "" },
    });
  };

  const removeMaterialFromTable = () => {
      console.log(checkedMaterialID)
    setProductMaterials((prevProductMaterial) => {
      return prevProductMaterial.filter((pm) => pm.id !== checkedMaterialID);
    });
  };

  React.useEffect(() => {
    (async () => {
      try {
        const getProduct = () => {
          return axios.get(
            SERVER_URL + `/api/product/${props.inspectedProductID}`,
            {
              withCredentials: true,
            }
          );
        };

        const getMaterial = () => {
          return axios.get(
            SERVER_URL + `/api/material?businessID=${params.businessID}`,
            {
              withCredentials: true,
            }
          );
        };

        const [{ data: productData }, { data: materialData }] =
          await Promise.all([getProduct(), getMaterial()]);

        setProduct(productData.data);
        setMaterial(materialData.data);
        console.log(productData);
        console.log(materialData);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const addMaterial = async () => {
    // check input -> if error show error
    // send request -> if error show error
    //              -> if success back to inspecting
    const materialPayload = getMaterialPayload(
      material,
      params.businessID,
      isSafetyStockEnabled
    );
    const firstBatchPayload = getBatchPayload(firstBatch);

    const materialValidationReport = validateMaterial(
      materialPayload,
      isSafetyStockEnabled
    );
    const firstBatchValidationReport = validateBatch(firstBatchPayload);

    const error = utils.checkError([
      materialValidationReport,
      firstBatchValidationReport,
    ]);

    if (error) {
      // update UI to show error on inputs
      utils.showError(
        [materialValidationReport, firstBatchValidationReport],
        [errorMaterialDispatch, errorFirstBatchDispatch]
      );
      return;
    }

    // send network request
    try {
      const materialID = await sendMaterial(materialPayload);
      await sendBatch({ ...firstBatchPayload, materialID });

      // 100% success

      props.closeView({
        variant: "darkSuccess",
        msg: "New material added!",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "qty", width: "60px" },
    { label: "MEASUREMENT", map: "measurement" },
  ];

  return (
    <Paper variant="customPaper" sx={{ padding: "30px" }}>
      <h2>Add Product Information</h2>
      <br />
      <TextField
        value={firstBatch.supplier.name}
        required
        fullWidth
        onChange={(e, child) => {
          firstBatchDispatch({
            type: "onchange-firstBatch-supplier",
            payload: { id: child.props.id, name: e.target.value },
          });
          if (errorFirstBatch.supplier.error) {
            utils.resetError("error-supplier", errorFirstBatchDispatch);
          }
        }}
        label="Product name"
        error={errorFirstBatch.supplier.error}
        helperText={errorFirstBatch.supplier.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <TextField
        value={firstBatch.supplier.name}
        required
        fullWidth
        onChange={(e, child) => {
          firstBatchDispatch({
            type: "onchange-firstBatch-supplier",
            payload: { id: child.props.id, name: e.target.value },
          });
          if (errorFirstBatch.supplier.error) {
            utils.resetError("error-supplier", errorFirstBatchDispatch);
          }
        }}
        label="Product Price in IDR"
        error={errorFirstBatch.supplier.error}
        helperText={errorFirstBatch.supplier.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <TextField
        value={material.name}
        label="Production Process"
        variant="outlined"
        color="black"
        required
        fullWidth
        multiline
        onChange={(e) => {
          materialDispatch({
            type: "onchange-material-name",
            payload: { name: e.target.value },
          });
          if (errorMaterial.name.error) {
            utils.resetError("error-name", errorMaterialDispatch);
          }
        }}
        error={errorMaterial.name.error}
        helperText={errorMaterial.name.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <h2>Add Product Material</h2>
      <br />
      <TextField
        select
        value={productMaterial.material.name}
        required
        fullWidth
        onChange={(e, child) => {
          productMaterialDispatch({
            type: "onchange-productMaterial-material",
            payload: { id: child.props.id, name: e.target.value },
          });
          productMaterialDispatch({
            type: "onchange-productMaterial-measurement",
            payload: {
              id: child.props.dataMeasurementID,
              name: child.props.dataMeasurement,
            },
          });
          if (errorProductMaterial.material.error) {
            utils.resetError("error-material", errorProductMaterialDispatch);
          }
          console.log(productMaterial);
        }}
        label="Material"
        error={errorProductMaterial.material.error}
        helperText={errorProductMaterial.material.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
      >
        {mtrl.map((option) => (
          <MenuItem
            id={option.material_id}
            key={option.material_id}
            value={option.name}
            dataMeasurement={option.measurement_name}
            dataMeasurementID={option.measurement_id}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
        <TextField
          value={productMaterial.qty}
          label="Qty"
          variant="outlined"
          color="black"
          required
          onChange={(e) => {
            productMaterialDispatch({
              type: "onchange-productMaterial-qty",
              payload: { qty: e.target.value },
            });
            if (errorProductMaterial.qty.error) {
              utils.resetError("error-qty", errorProductMaterialDispatch);
            }
          }}
          error={errorProductMaterial.qty.error}
          helperText={errorProductMaterial.qty.msg}
          sx={{ flexGrow: 50 }}
          size="small"
        />
        <TextField
          value={productMaterial.measurement.name}
          disabled
          label="Measurement"
          sx={{ flexGrow: 40 }}
          size="small"
          InputLabelProps={{
            shrink: productMaterial.measurement.name ? true : false,
          }}
        ></TextField>
      </Stack>
      <Button
        onClick={addMaterialToProduct}
        variant="containedBlue"
        sx={{ width: "100%", padding: "10px 0" }}
      >
        Add Material to Product
      </Button>
      <br />
      <br />
      <h2>Product Materials</h2>
      <br />
      <GeeTable
        tableData={productMaterials}
        headCells={headCells}
        checkedID="id"
        onChecked={setCheckedMaterialID}
        minWidth="504px"
        tableButton={{
          label: "Remove Material",
          onClick: removeMaterialFromTable,
        }}
      />
      <br />
      <br />
      <Button
        onClick={addMaterial}
        variant="containedBlue"
        sx={{ width: "100%", padding: "10px 0" }}
      >
        Add Product
      </Button>
    </Paper>
  );
}
