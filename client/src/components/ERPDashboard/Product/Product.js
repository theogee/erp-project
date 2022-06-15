/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

import { GeeTable } from "../../GeeComponents";

import InspectedProduct from "./InspectedProduct";
import AddProduct from "./AddProduct";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

export default function Product() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [tableData, setTableData] = React.useState([]);
  const [inspectedProductID, setInspectedProductID] = React.useState(0);
  const [isAdding, setIsAdding] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState({});

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "PRICE", map: "price", width: "60px" },
  ];

  const getProducts = async () => {
    const { data } = await axios.get(
      SERVER_URL + `/api/product?businessID=${params.businessID}`,
      {
        withCredentials: true,
      }
    );

    console.log(data.data);
    data.data.forEach((data) => {
      data.price = formatPrice(data.price);
    });

    setTableData(data.data);
    setInspectedProductID(data.data[0].product_id);
  };

  const formatPrice = (priceData) => {
    return "IDR " + priceData.toLocaleString("id-ID");
  };

  useEffect(() => {
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
      <Box component="main" sx={{ backgroundColor: "#F3F3F3" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Product</h1>
        <GeeTable
          tableData={tableData}
          headCells={headCells}
          checkedID="product_id"
          onChecked={setInspectedProductID}
          minWidth="504px"
          tableButton={{
            label: "Add Product",
            onClick: (newState) => setIsAdding(newState),
          }}
        />
      </Box>
      <Box sx={{ width: "600px" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          {isAdding ? "Adding Product..." : "Inspecting Product..."}
        </h1>
        {isAdding ? (
          <AddProduct
            closeView={() => {
              setSnackBar(snackBar);
              setIsAdding(false);
              getProducts();
            }}
            inspectedProductID={inspectedProductID}
          />
        ) : (
          <InspectedProduct inspectedProductID={inspectedProductID} />
        )}
      </Box>
      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBar({ isOpen: false })}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={() => setSnackBar({ isOpen: false })}
          severity={snackBar.severity}
          variant={snackBar.variant}
          sx={{ width: "100%" }}
        >
          {snackBar.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
