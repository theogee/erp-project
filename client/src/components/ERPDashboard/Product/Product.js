import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { useOutletContext } from "react-router-dom";
import { Stack } from "@mui/material";

import ProductTable from "./ProductTable";
import NewProduct from "./NewProduct";

export default function Warehouse() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { user, businessID } = useOutletContext();

  const navigate = useNavigate();

  const [products, setProduct] = useState([]);
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/product?businessID=${businessID}`,
          {
            withCredentials: true,
          }
        );

        console.log(data.data);

        setProduct(data.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  return (
    <Stack>
      <h1>PRODUCT</h1>
      <br />
      <Outlet context={{ user, businessID, showTable }} />
    </Stack>
  );
}