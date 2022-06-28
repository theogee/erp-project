/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { GeeTable } from "../../../GeeComponents";

import { TopBorderCard } from "../../../lib/Cards";

export default function ProductsTable(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { products } = props;

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
  ];

  return (
    <Box>
      {products.length === 0 ? (
        <TopBorderCard
          text="You currently don't have any product registered. Add product to get
        started."
        >
          <Button
            variant="containedGreen"
            onClick={() =>
              navigate(`/b/${params.businessID}/dashboard/production/add`)
            }
          >
            Add product
          </Button>
        </TopBorderCard>
      ) : (
        <>
          <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Products</h1>
          <GeeTable
            tableData={products || []}
            headCells={headCells}
            checkedID="product_id"
            onChecked={(checkedID) => {
              props.setInspectedProductID(checkedID);
            }}
            minWidth="504px"
            tableButton={{
              label: "Add Product",
              onClick: () =>
                navigate(`/b/${params.businessID}/dashboard/production/add`),
            }}
          />
        </>
      )}
    </Box>
  );
}
