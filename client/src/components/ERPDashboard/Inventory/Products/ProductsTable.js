/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { GeeTable } from "../../../GeeComponents";

import { TopBorderCard } from "../../../lib/Cards";

export default function ProductsTable(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL +
            `/api/product?businessID=${params.businessID}&withQty=true`,
          { withCredentials: true }
        );

        setProducts(data.data);
        props.setInspectedProductID(data.data[0].product_id);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "cummulative_qty", width: "60px" },
  ];

  return (
    <Box>
      {products.length === 0 ? (
        <TopBorderCard text="You currently don't have any product manufactured. Add job to start manufacturing products.">
          <Button
            variant="containedGreen"
            onClick={() =>
              navigate(`/b/${params.businessID}/dashboard/production/jobs`)
            }
          >
            Add Job
          </Button>
        </TopBorderCard>
      ) : (
        <>
          <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Products</h1>
          <GeeTable
            tableData={products}
            headCells={headCells}
            checkedID="product_id"
            onChecked={(checkedID) => {
              props.setInspectedProductID(checkedID);
            }}
            minWidth="504px"
          />
        </>
      )}
    </Box>
  );
}
