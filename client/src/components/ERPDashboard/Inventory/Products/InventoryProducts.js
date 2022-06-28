import React from "react";

import Stack from "@mui/material/Stack";

import ProductsTable from "./ProductsTable";
import InspectedProduct from "./InspectedProduct";

export default function InventoryProducts() {
  const [inspectedProductID, setInspectedProductID] = React.useState(0);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <ProductsTable
        setInspectedProductID={(productID) => {
          setInspectedProductID(productID);
        }}
      />
      <InspectedProduct inspectedProductID={inspectedProductID} />
    </Stack>
  );
}
