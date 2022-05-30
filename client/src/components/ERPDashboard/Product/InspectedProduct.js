/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useState } from "react-router-dom";

import Box from "@mui/material/Box";

import { GeeTable } from "../../GeeComponents";

export default function InspectedMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [inspectedProduct, setInspectedProduct] = React.useState({});
  const [productMaterial, setProductMaterial] = React.useState([]);
  const [productBatches, setProductBatches] = React.useState([]);


  const navigate = useNavigate();

  const { inspectedProductID } = props;

  React.useEffect(() => {
    (async () => {
      try {
        const { data: productData } = await axios.get(
          SERVER_URL + `/api/product/${inspectedProductID}`,
          {
            withCredentials: true,
          }
        );

        productData.data.price = formatPrice(productData.data.price);
        setInspectedProduct({ ...productData.data, qty: 0 });
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }

      setProductMaterial([]);
      
      try {
        const { data: productMaterialData } = await axios.get(
          SERVER_URL + `/api/product_material/${inspectedProductID}`,
          {
            withCredentials: true,
          }
        );
        console.log(productMaterialData.data[0])
        setProductMaterial(productMaterialData.data);
        console.log(productMaterial);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }  

      setProductBatches([]);
      try {
        const { data: productBatchesData } = await axios.get(
          SERVER_URL + `/api/product_batches/p/${inspectedProductID}`,
          {
            withCredentials: true,
          }
        );
        console.log(productBatchesData.data)
        productBatchesData.data.forEach((data) => {
          data.expiry_date = formatDate(data.expiry_date);
          data.production_date =  formatDate(data.production_date);
        });
        setProductBatches(productBatchesData.data);
        //console.log(productMaterial);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedProductID]);

  const formatDate = (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const formatPrice = (priceData) => {
    return "IDR " + priceData.toLocaleString("id-ID");
  };

  const headBatches = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "BATCH ID", map: "product_batch_id" },
    { label: "QTY", map: "qty", width: "60px" },
    { label: "PRODUCTION DATE", map: "production_date", width: "60px" },
    { label: "EXPIRY DATE", map: "expiry_date", width: "70px" },
    { label: "STATUS", map: "definedStatus", width: "70px", type: "status" },
  ];

  const headMaterial = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "qty", width: "60px" },
    { label: "MEAS.", map: "measurement_name", width: "60px" },
  ];

  return (
    <Box>
      <Box
        sx={{
          fontSize: "13px",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "15px 30px",
          boxShadow:
            "0px 0px 0px 0.637838px rgba(152, 161, 178, 0.1), 0px 0.637838px 2.55135px rgba(69, 75, 87, 0.12), 0px 0px 1.27568px rgba(0, 0, 0, 0.08);",
          "& > p": {
            margin: "5px 0",
            fontWeight: "500",
          },
        }}
      >
        <p>Name: {inspectedProduct.name}</p>
        <p>Stock Qty: {inspectedProduct.qty} Pcs</p>
        <p>Price: {inspectedProduct.price}</p>
        <p>Production Process: {inspectedProduct.production_process}</p>
      </Box>
      <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Material</h2>
      <GeeTable
        tableData={productMaterial}
        headCells={headMaterial}
        minWidth="100%"
      />
      <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Batches</h2>
      <GeeTable
        tableData={productBatches}
        headCells={headBatches}
        minWidth="100%"
      />
    </Box>
  );
}
