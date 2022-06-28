import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import ProductsTable from "./ProductsTable";
import InspectedProduct from "./InspectedProduct";

export default function Main() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [products, setProducts] = React.useState([]);
  const [inspectedProductID, setInspectedProductID] = React.useState(0);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        SERVER_URL + `/api/product?businessID=${params.businessID}`,
        { withCredentials: true }
      );
      setProducts(data.data);
      setInspectedProductID(data.data[0].product_id);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        getProducts();
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <ProductsTable
        products={products}
        setInspectedProductID={(productID) => {
          setInspectedProductID(productID);
        }}
      />
      <InspectedProduct
        refresh={getProducts}
        inspectedProductID={inspectedProductID}
      />
    </Stack>
  );
}
