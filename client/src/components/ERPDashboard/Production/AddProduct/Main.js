import React from "react";

import Stack from "@mui/material/Stack";

import AddProduct from "./AddProduct";
import MaterialsPerUnit from "./MaterialsPerUnit";

export default function Main() {
  const [productMaterials, setProductMaterials] = React.useState([]); // store all added materials for the product

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <AddProduct productMaterials={productMaterials} />
      <MaterialsPerUnit
        productMaterials={productMaterials}
        setProductMaterials={(newState) => setProductMaterials(newState)}
      />
    </Stack>
  );
}
