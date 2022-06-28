/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { formatPrice, formatDate } from "../../lib/utils";

import { GeeTable } from "../../GeeComponents";

export default function Detail(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const { inspectedTransactionID } = props;

  const [inspectedTransaction, setInspectedTransaction] = React.useState({});

  React.useEffect(() => {
    (async () => {
      try {
        if (inspectedTransactionID) {
          const { data: transactionData } = await axios.get(
            SERVER_URL + `/api/order/${inspectedTransactionID}`,
            { withCredentials: true }
          );

          transactionData.data.order_items.forEach((i) => {
            i.product_price = formatPrice(i.product_price);
            i.total = formatPrice(i.total);
          });

          setInspectedTransaction(transactionData.data);
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedTransactionID]);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "ITEM", map: "product_name" },
    { label: "QTY", map: "qty" },
    { label: "PRICE/UNIT", map: "product_price" },
    { label: "TOTAL", map: "total" },
  ];

  return (
    <Box>
      <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Transaction</h1>
      <Paper variant="customPaper" code="inspect">
        <p>Order ID: {inspectedTransaction?.order_id}</p>
        <p>Order Date: {formatDate(inspectedTransaction?.order_date || "")}</p>
        <p>Client Name: {inspectedTransaction?.client_name}</p>
        <p>
          Grand Total: {formatPrice(inspectedTransaction?.grand_total || "")}
        </p>
      </Paper>
      <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Ordered Items</h2>
      <GeeTable
        tableData={inspectedTransaction.order_items || []}
        headCells={headCells}
        checkedID="product_id"
        onChecked={() => {}}
        minWidth="100%"
      />
    </Box>
  );
}
