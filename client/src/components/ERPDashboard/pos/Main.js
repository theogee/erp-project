/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { GeeTable } from "../../GeeComponents";

import { formatDate } from "../../lib/utils";

import Detail from "./Detail";
import { TopBorderCard2 } from "../../lib/Cards";

export default function Transaction() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [transactions, setTransactions] = React.useState([]);
  const [inspectedTransactionID, setInspectedTransactionID] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const { data: transactionData } = await axios.get(
          SERVER_URL + `/api/order?businessID=${params.businessID}`,
          { withCredentials: true }
        );

        transactionData.data.forEach(
          (t) => (t.order_date = formatDate(t.order_date))
        );
        setTransactions(transactionData.data);
        setInspectedTransactionID(transactionData.data[0].order_id);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "ORDER ID", map: "order_id" },
    { label: "ORDER DATE", map: "order_date" },
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Transaction</h1>

        {transactions.length === 0 ? (
          <TopBorderCard2
            variant="topBorderGreen"
            text="Currently you don't have any order made. Add order to get started."
          >
            <Button
              variant="containedGreen"
              onClick={() => navigate("cashier")}
            >
              Add Order
            </Button>
          </TopBorderCard2>
        ) : (
          <GeeTable
            tableData={transactions}
            headCells={headCells}
            checkedID="order_id"
            onChecked={(orderID) => setInspectedTransactionID(orderID)}
            tableButton={{
              label: "Add order",
              onClick: () => navigate("cashier"),
            }}
          />
        )}
      </Box>
      {transactions.length !== 0 && (
        <Box sx={{ minWidth: "50%" }}>
          <Detail inspectedTransactionID={inspectedTransactionID} />
        </Box>
      )}
    </Stack>
  );
}
