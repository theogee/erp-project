/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { GeeTable } from "../../../../GeeComponents";

import { TopBorderCard } from "../../../../lib/Cards";

import {
  productMaterialReducer,
  productMaterialModel,
  getProductMaterialPayload,
  validateProductMaterial,
  utils,
} from "../../../../lib/form";

export default function MaterialsPerUnit(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const { productMaterials, setProductMaterials } = props;

  const [material, setMaterial] = React.useState([]); // fetched business's materials will be stored here
  const [checkedMaterialID, setCheckedMaterialID] = React.useState(0);

  // store the state of the "to be added" product
  const [onAddingProduct, onAddingProductDispatch] = React.useReducer(
    productMaterialReducer.inputs,
    productMaterialModel.inputs
  );

  const [errorOnAddingProduct, errorOnAddingProductDispatch] = React.useReducer(
    productMaterialReducer.errors,
    productMaterialModel.errors
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data: materialData } = await axios.get(
          SERVER_URL + `/api/material?businessID=${params.businessID}`,
          {
            withCredentials: true,
          }
        );

        setMaterial(materialData.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "qty", width: "60px" },
    { label: "MEASUREMENT", map: "measurement" },
  ];

  const addMaterialToProduct = () => {
    const onAddingProductPayload = getProductMaterialPayload(
      onAddingProduct,
      ""
    );

    const onAddingProductValidationReport = validateProductMaterial(
      onAddingProductPayload
    );

    const error = utils.checkError([onAddingProductValidationReport]);

    if (error) {
      utils.showError(
        [onAddingProductValidationReport],
        [errorOnAddingProductDispatch]
      );
      return;
    }

    if (productMaterials.length === 0)
      setCheckedMaterialID(onAddingProduct.material.id);

    // if the material had been added before, update the corresponding material instead of adding a new one
    let isDuplicate = false;
    productMaterials.forEach((pm, i) => {
      if (pm.id === onAddingProduct.material.id) {
        isDuplicate = true;
        const temp = [...productMaterials];
        temp[i].qty = onAddingProduct.qty;
        setProductMaterials(temp);
      }
    });

    if (!isDuplicate) {
      setProductMaterials((prevProductMaterials) => {
        return [
          ...prevProductMaterials,
          {
            id: onAddingProduct.material.id,
            name: onAddingProduct.material.name,
            qty: onAddingProduct.qty,
            measurement: onAddingProduct.measurement.name,
            measurementID: onAddingProduct.measurement.id,
          },
        ];
      });
    }

    onAddingProductDispatch({
      type: "onchange-productMaterial-material",
      payload: { id: "", name: "" },
    });
    onAddingProductDispatch({
      type: "onchange-productMaterial-qty",
      payload: { qty: "" },
    });
    onAddingProductDispatch({
      type: "onchange-productMaterial-measurement",
      payload: { id: "", name: "" },
    });
  };

  const removeMaterialFromTable = () => {
    setProductMaterials((prevProductMaterials) => {
      return prevProductMaterials.filter((pm) => pm.id !== checkedMaterialID);
    });
    setCheckedMaterialID(productMaterials[0].id);
  };

  return (
    <Box>
      <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
        Materials per unit
      </h1>
      {productMaterials.length === 0 ? (
        <TopBorderCard text="You currently have no material added." />
      ) : (
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
      )}

      <Paper variant="customPaper" sx={{ padding: "30px", marginTop: "46px" }}>
        <TextField
          select
          value={onAddingProduct.material.name}
          required
          fullWidth
          onChange={(e, child) => {
            onAddingProductDispatch({
              type: "onchange-productMaterial-material",
              payload: { id: child.props.id, name: e.target.value },
            });
            onAddingProductDispatch({
              type: "onchange-productMaterial-measurement",
              payload: {
                id: child.props.measurement_id,
                name: child.props.measurement_name,
              },
            });
            if (errorOnAddingProduct.material.error) {
              utils.resetError("error-material", errorOnAddingProductDispatch);
            }
          }}
          label="Material"
          error={errorOnAddingProduct.material.error}
          helperText={errorOnAddingProduct.material.msg}
          size="small"
          sx={{ marginBottom: "30px" }}
        >
          {material.map((option) => (
            <MenuItem
              id={option.material_id}
              key={option.material_id}
              value={option.name}
              measurement_name={option.measurement_name}
              measurement_id={option.measurement_id}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
          <TextField
            value={onAddingProduct.qty}
            label="Qty"
            variant="outlined"
            color="black"
            required
            onChange={(e) => {
              onAddingProductDispatch({
                type: "onchange-productMaterial-qty",
                payload: { qty: e.target.value },
              });
              if (errorOnAddingProduct.qty.error) {
                utils.resetError("error-qty", errorOnAddingProductDispatch);
              }
            }}
            error={errorOnAddingProduct.qty.error}
            helperText={errorOnAddingProduct.qty.msg}
            sx={{ flexGrow: 50 }}
            size="small"
          />
          <TextField
            value={onAddingProduct.measurement.name}
            disabled
            label="Measurement"
            sx={{ flexGrow: 40 }}
            size="small"
            InputLabelProps={{
              shrink: onAddingProduct.measurement.name ? true : false,
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
      </Paper>
    </Box>
  );
}
