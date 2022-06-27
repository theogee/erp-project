/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { GeeTable } from "../../../GeeComponents";

import { formatPrice } from "../../../lib/utils";

export default function ProductMenu(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [products, setProducts] = React.useState([]);
  const { setOrderItems, orderItems } = props;

  React.useEffect(() => {
    (async () => {
      try {
        const { data: productsData } = await axios.get(
          SERVER_URL +
            `/api/product?businessID=${params.businessID}&withQty=true`,
          { withCredentials: true }
        );

        productsData.data.forEach(
          (t) => (t.formatted_price = formatPrice(t.price))
        );
        setProducts(productsData.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const AddButton = (props) => (
    <AddBoxIcon
      color="blue"
      fontSize="medium"
      onClick={() => {
        if (Number(props.cummulative_qty) !== 0) {
          const isOrdered = orderItems.some(
            (i) => i.product_id === props.product_id
          );
          if (!isOrdered) setOrderItems([...orderItems, props]);
        }
      }}
      sx={{ cursor: "pointer" }}
    />
  );

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "STOCK", map: "cummulative_qty" },
    { label: "PRICE/UNIT", map: "formatted_price" },
    { label: "ADD", map: "customComponent", customComponent: AddButton },
  ];

  return (
    <Box>
      <GeeTable
        withCheckbox={false}
        tableData={products}
        headCells={headCells}
      />
    </Box>
  );
}
