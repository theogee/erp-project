/** @jsxImportSource @emotion/react */
import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

import {
  orderReducer,
  orderModel,
  getOrderPayload,
  validateOrder,
  sendOrder,
  utils,
} from "../../../lib/form/";

import { GeeTable } from "../../../GeeComponents";
import { TopBorderCard2 } from "../../../lib/Cards";

import { formatPrice } from "../../../lib/utils";
import axios from "axios";

export default function Order(props) {
  const params = useParams();
  const navigate = useNavigate();
  // the temp ordered items shown in the ui, consist of all product id tot rack whcih product is added to the items table  (different from order.orderItems)
  const { orderItems, setOrderItems } = props;

  const [order, orderDispatch] = React.useReducer(
    orderReducer.inputs,
    orderModel.inputs
  );
  const [errorOrder, errorOrderDispatch] = React.useReducer(
    orderReducer.errors,
    orderModel.errors
  );

  const checkOut = async () => {
    const orderPayload = getOrderPayload(order, params.businessID);
    const orderValidationReport = validateOrder(orderPayload);
    const error = utils.checkError([orderValidationReport]);

    if (error) {
      utils.showError([orderValidationReport], [errorOrderDispatch]);
      return;
    }

    console.log(orderPayload);

    try {
      await sendOrder(orderPayload);
      navigate(`/b/${params.businessID}/dashboard/pos`);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (orderItems) {
      orderDispatch({
        type: "onchange-order-orderItems",
        payload: {
          orderItems: [
            ...order.orderItems,
            ...orderItems
              .filter(
                (o) =>
                  !order.orderItems.some((oi) => o.product_id === oi.productID)
              )
              .map((o) => ({ productID: o.product_id, qty: 1 })),
          ],
        },
      });
    }
  }, [orderItems]);

  const qtyCounter = (props) => {
    return (
      <Stack flexDirection="row" alignItems="center">
        <IndeterminateCheckBoxIcon
          color="red"
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            const item = order.orderItems.find(
              (o) => o.productID === props.product_id
            );
            if (item.qty === 1) return;
            orderDispatch({
              type: "onchange-order-orderItems",
              payload: {
                orderItems: order.orderItems.map((o) => {
                  if (o.productID === props.product_id) {
                    return { ...o, qty: o.qty - 1 };
                  }
                  return o;
                }),
              },
            });
          }}
        />
        <p css={{ margin: "0 5px" }}>
          {order.orderItems.find((o) => o.productID === props.product_id)?.qty}
        </p>
        <AddBoxIcon
          color="blue"
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            const item = order.orderItems.find(
              (o) => o.productID === props.product_id
            );
            if (item.qty === Number(props.cummulative_qty)) return;
            orderDispatch({
              type: "onchange-order-orderItems",
              payload: {
                orderItems: order.orderItems.map((o) => {
                  if (o.productID === props.product_id) {
                    return { ...o, qty: o.qty + 1 };
                  }
                  return o;
                }),
              },
            });
          }}
        />
      </Stack>
    );
  };

  const deleteItem = (props) => {
    return (
      <DeleteIcon
        color="red"
        fontSize="small"
        sx={{ cursor: "pointer" }}
        onClick={() => {
          setOrderItems(
            orderItems.filter((o) => o.product_id !== props.product_id)
          );
          orderDispatch({
            type: "onchange-order-orderItems",
            payload: {
              orderItems: order.orderItems.filter(
                (o) => o.productID !== props.product_id
              ),
            },
          });
        }}
      />
    );
  };

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "customComponent", customComponent: qtyCounter },
    {
      label: "TOTAL",
      map: "customComponent",
      customComponent: (props) => (
        <p>
          {formatPrice(
            props.price *
              order.orderItems.find((o) => o.productID === props.product_id)
                ?.qty
          )}
        </p>
      ),
    },
    { label: "DELETE", map: "customComponent", customComponent: deleteItem },
  ];

  return (
    <Paper variant="customPaper" sx={{ padding: "30px" }}>
      <TextField
        value={order.clientName}
        label="Client Name"
        variant="outlined"
        color="black"
        fullWidth
        onChange={(e) => {
          orderDispatch({
            type: "onchange-order-clientName",
            payload: { clientName: e.target.value },
          });
        }}
        error={null}
        helperText={null}
        size="small"
        sx={{ marginBottom: "30px" }}
      />
      <TextField
        value={null}
        label="Order Date"
        variant="outlined"
        color="black"
        required
        fullWidth
        onChange={(e) => {
          orderDispatch({
            type: "onchange-order-orderDate",
            payload: { orderDate: e.target.value },
          });
          if (errorOrder.orderDate.error)
            utils.resetError("error-orderDate", errorOrderDispatch);
        }}
        error={errorOrder.orderDate.error}
        helperText={errorOrder.orderDate.msg}
        size="small"
        sx={{ marginBottom: "30px" }}
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <p css={{ marginBottom: "10px" }}>Items</p>
      {orderItems.length === 0 ? (
        <TopBorderCard2 variant="topBorderYellow" text="No product added" />
      ) : (
        <GeeTable
          tableData={orderItems}
          headCells={headCells}
          withCheckbox={false}
          minWidth="100%"
        />
      )}
      <TextField
        value={formatPrice(
          orderItems.reduce((prev, current) => {
            return (
              prev +
              order.orderItems.find((o) => o.productID === current.product_id)
                ?.qty *
                current.price
            );
          }, 0)
        )}
        label="Grand Total"
        variant="outlined"
        color="black"
        fullWidth
        size="small"
        sx={{ marginBottom: "30px", marginTop: "30px" }}
        InputProps={{
          readOnly: true,
        }}
      />
      <Button
        onClick={checkOut}
        variant="containedBlue"
        sx={{ width: "100%", padding: "10px 0" }}
      >
        Check out
      </Button>
    </Paper>
  );
}
