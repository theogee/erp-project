/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import RefillBatchDialog from "./RefillBatchDialog";
import CheckIcon from "@mui/icons-material/Check";

import { GeeCircleStatus, GeeTable } from "../../../GeeComponents";

import { AlertDialog, ErrorDialog } from "../../../lib/Dialog";

import { formatDate, formatPrice } from "../../../lib/utils";
import { TopBorderCard2 } from "../../../lib/Cards";

export default function InspectedMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [inspectedMaterial, setInspectedMaterial] = React.useState({});
  const [inspectedBatches, setInspectedBatches] = React.useState([]);
  const [inspectedBatch, setInspectedBatch] = React.useState({});
  const [supplier, setSupplier] = React.useState({});
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = React.useState(false);
  const [isRefilling, setIsRefilling] = React.useState(false);

  const navigate = useNavigate();

  const { inspectedMaterialID } = props;

  const getBatches = async () => {
    try {
      let { data: batchesData } = await axios.get(
        SERVER_URL + `/api/batches?materialID=${inspectedMaterialID}`,
        { withCredentials: true }
      );
      // hides batches with 0 qty
      batchesData.data = batchesData.data.filter((b) => b.current_qty !== 0);

      batchesData.data.forEach((data) => {
        data.purchase_date = formatDate(data.purchase_date);
        data.expiry_date = formatDate(data.expiry_date);
        data.purchase_price = formatPrice(data.purchase_price);
        data.price_per_unit = formatPrice(data.price_per_unit);
      });

      setInspectedBatches(batchesData.data);
      setInspectedBatch(batchesData.data[0]);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { data: materialData } = await axios.get(
          SERVER_URL + `/api/material/${inspectedMaterialID}`,
          {
            withCredentials: true,
          }
        );

        setInspectedMaterial(materialData.data);

        getBatches();
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedMaterialID]);

  React.useEffect(() => {
    (async () => {
      try {
        if (inspectedBatch.supplier_id) {
          const { data: supplierData } = await axios.get(
            SERVER_URL + `/api/supplier/${inspectedBatch.supplier_id}`,
            {
              withCredentials: true,
            }
          );

          setSupplier(supplierData.data[0]);
        }
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedBatch]);

  const calcTotalQty = () => {
    return inspectedBatches.reduce(
      (prev, current) => prev + current.current_qty,
      0
    );
  };

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "PUR. DATE", map: "purchase_date", width: "70px" },
    { label: "EX. DATE", map: "expiry_date", width: "80px" },
    { label: "QTY", map: "current_qty", width: "50px" },
    {
      label: "MEAS.",
      forcedValue: inspectedMaterial?.measurement_name,
      width: "70px",
    },
    { label: "PRICE/UNIT", map: "price_per_unit", width: "60px" },
    { label: "PUR. PRICE", map: "purchase_price", width: "90px" },
  ];

  const deleteMaterial = async () => {
    try {
      // first, delete all batches from that material
      await axios.delete(
        SERVER_URL + `/api/batches?materialID=${inspectedMaterialID}`,
        {
          withCredentials: true,
        }
      );
      // second, delete the material itself
      await axios.delete(SERVER_URL + `/api/material/${inspectedMaterialID}`, {
        withCredentials: true,
      });

      props.refresh();
    } catch (err) {
      // there exist product which depends on the materialID
      if (err.response.data.msg.code === "23503") setIsErrorDialogOpen(true);
    }
  };

  return (
    <Box>
      <Paper variant="customPaper" code="inspect" sx={{ position: "relative" }}>
        <p>Name: {inspectedMaterial?.name}</p>
        <p>
          Total Qty: {calcTotalQty()} {inspectedMaterial?.measurement_name}
        </p>
        {inspectedMaterial?.safety_stock_qty && (
          <>
            <p>
              Safety Stock: {inspectedMaterial?.safety_stock_qty}{" "}
              {inspectedMaterial?.measurement_name}
            </p>
            <Stack component="p" direction="row" alignItems="center">
              <p css={{ marginRight: "10px" }}>Status:</p>
              <GeeCircleStatus
                type="stock"
                cummulativeQty={inspectedMaterial?.cummulative_qty}
                safetyStockQty={inspectedMaterial?.safety_stock_qty}
              />
            </Stack>
          </>
        )}
        <Stack
          direction="row"
          sx={{
            width: "90px",
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
          justifyContent="space-between"
        >
          <Paper
            variant="elevatedButton"
            component={Button}
            onClick={() => navigate(`${inspectedMaterialID}/edit`)}
          >
            <ModeEditRoundedIcon color="primary" sx={{ fontSize: "20px" }} />
          </Paper>
          <Paper
            variant="elevatedButton"
            component={Button}
            onClick={() => setIsAlertDialogOpen(true)}
          >
            <DeleteIcon color="red" sx={{ fontSize: "20px" }} />
          </Paper>
        </Stack>
        {inspectedBatches.length !== 0 && (
          <Button
            variant="GeeTableButton"
            startIcon={<CheckIcon />}
            sx={{
              padding: "5px 10px",
              position: "absolute",
              top: "-40px",
              right: "10px",
            }}
            onClick={() => navigate(`${inspectedMaterialID}/checkstock`)}
          >
            check stock
          </Button>
        )}
      </Paper>
      <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Refill Batches</h2>
      {inspectedBatches.length === 0 ? (
        <TopBorderCard2
          variant="topBorderYellow"
          text="Currently there are no stock available for this material. Refill this material to use."
        >
          <Button
            variant="containedYellow"
            onClick={() => setIsRefilling(true)}
          >
            Refill material
          </Button>
        </TopBorderCard2>
      ) : (
        <>
          <GeeTable
            tableData={inspectedBatches}
            headCells={headCells}
            minWidth="100%"
            checkedID="batch_id"
            onChecked={(batchID) =>
              setInspectedBatch(
                inspectedBatches.find((batch) => batch.batch_id === batchID)
              )
            }
            tableButton={{
              label: "Refill material",
              onClick: () => setIsRefilling(true),
            }}
          />
          <Paper
            sx={{ marginTop: "34px" }}
            variant="customPaper"
            code="inspect"
          >
            <p>Supplier: {supplier?.name}</p>
            <p>
              Purchase Qty: {inspectedBatch?.purchase_qty}{" "}
              {inspectedMaterial?.measurement_name}
            </p>
            <p>
              Current Qty: {inspectedBatch?.current_qty}{" "}
              {inspectedMaterial?.measurement_name}
            </p>
            <p>Price/Unit: {inspectedBatch?.price_per_unit}</p>
            <p>Purchase Price: {inspectedBatch?.purchase_price}</p>
            <p>Purchase Date: {inspectedBatch?.purchase_date}</p>
            <p>Expiry Date: {inspectedBatch?.expiry_date}</p>
          </Paper>
        </>
      )}
      <AlertDialog
        isOpen={isAlertDialogOpen}
        title="Delete the selected material data?"
        text="You will not be able to recover this data!"
        onDelete={deleteMaterial}
        onCancel={() => setIsAlertDialogOpen(false)}
      />
      <ErrorDialog
        isOpen={isErrorDialogOpen}
        title="Can not delete material data."
        text="There exist one or more product data which rely on this material data. Remove this material from products which use it and try again."
        onCancel={() => setIsErrorDialogOpen(false)}
      />
      <RefillBatchDialog
        isOpen={isRefilling}
        title="Refilling batch..."
        onCancel={() => setIsRefilling(false)}
        refresh={() => {
          getBatches();
          props.refresh();
        }}
        inspectedMaterial={inspectedMaterial}
      />
    </Box>
  );
}
