/** @jsxImportSource @emotion/react */
import React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import ProductMenu from "./ProductMenu";
import Order from "./Order";

export default function Main() {
  const [orderItems, setOrderItems] = React.useState([]);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Product Menu</h1>
        <ProductMenu
          setOrderItems={(orderItems) => setOrderItems(orderItems)}
          orderItems={orderItems}
        />
      </Box>
      <Box sx={{ width: "50%" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Order</h1>
        <Order
          orderItems={orderItems}
          setOrderItems={(orderItems) => setOrderItems(orderItems)}
        />
      </Box>
    </Stack>
  );
}
