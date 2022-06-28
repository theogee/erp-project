/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

import { formatPrice } from "../../../lib/utils";
import { ErrorDialog, AlertDialog } from "../../../lib/Dialog";
import { GeeTable } from "../../../GeeComponents";

export default function InspectedProduct(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const { inspectedProductID } = props;

  const navigate = useNavigate();

  const [inspectedProduct, setInspectedProduct] = React.useState({});
  const [inspectedProductMaterials, setInspectedProductMaterials] =
    React.useState([]);

  const [hasOngoingProcess, setHasOnGoingProcess] = React.useState(false);
  const [errorDialog, setErrorDialog] = React.useState({
    isOpen: false,
    title: "",
    text: "",
  });
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const [
          { data: product },
          { data: productMaterials },
          { data: productBatches },
        ] = await Promise.all([
          axios.get(SERVER_URL + `/api/product/${inspectedProductID}`, {
            withCredentials: true,
          }),
          axios.get(
            SERVER_URL +
              `/api/product_material?productID=${inspectedProductID}`,
            { withCredentials: true }
          ),
          axios.get(
            SERVER_URL +
              `/api/product_batches/p/${inspectedProductID}?status=yellow`,
            { withCredentials: true }
          ),
        ]);

        if (productBatches.data.length !== 0) setHasOnGoingProcess(true);
        else setHasOnGoingProcess(false);

        setInspectedProduct(product.data);
        setInspectedProductMaterials(productMaterials.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedProductID]);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "qty" },
    { label: "MEA.", map: "measurement_name" },
  ];

  const deleteProduct = async () => {
    try {
      await axios.delete(SERVER_URL + `/api/product/${inspectedProductID}`, {
        withCredentials: true,
      });
      props.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ minWidht: "600px", maxWidth: "40vw" }}>
      {inspectedProductID !== 0 && (
        <>
          <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
            Inspecting Product...
          </h1>
          <Paper
            variant="customPaper"
            sx={{ padding: "30px", position: "relative" }}
          >
            <TextField
              value={inspectedProduct.name}
              label="Name"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: inspectedProduct.name ? true : false,
              }}
              css={{ marginBottom: "30px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              value={formatPrice(inspectedProduct.price || 0)}
              label="Price"
              size="small"
              fullWidth
              InputLabelProps={{
                shrink: inspectedProduct.price ? true : false,
              }}
              css={{ marginBottom: "30px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              value={inspectedProduct.production_process}
              label="Production Process"
              size="small"
              multiline
              minRows={3}
              fullWidth
              InputLabelProps={{
                shrink: inspectedProduct.production_process ? true : false,
              }}
              css={{ marginBottom: "30px" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <p css={{ marginBottom: "10px" }}>Materials/Unit</p>
            <GeeTable
              tableData={inspectedProductMaterials}
              headCells={headCells}
              checkedID="material_id"
              onChecked={() => {}}
              minWidth="100%"
            />
            <Stack
              direction="row"
              sx={{
                width: "90px",
                position: "absolute",
                right: "10px",
                top: "-50px",
              }}
              justifyContent="space-between"
            >
              <Paper
                variant="elevatedButton"
                component={Button}
                onClick={() => {
                  if (!hasOngoingProcess)
                    navigate(`${inspectedProductID}/edit`);
                  else
                    setErrorDialog({
                      isOpen: true,
                      title: "Can not edit product data.",
                      text: "This product has on going processes. Finish or cancel the process first to edit this product.",
                    });
                }}
              >
                <ModeEditRoundedIcon
                  color="primary"
                  sx={{ fontSize: "20px" }}
                />
              </Paper>
              <Paper
                variant="elevatedButton"
                component={Button}
                onClick={() => {
                  if (!hasOngoingProcess) {
                    setIsAlertDialogOpen(true);
                  } else {
                    setErrorDialog({
                      isOpen: true,
                      title: "Can not delete product data.",
                      text: "This product has on going processes. Finish or cancel the process first to delete this product.",
                    });
                  }
                }}
              >
                <DeleteIcon color="red" sx={{ fontSize: "20px" }} />
              </Paper>
            </Stack>
          </Paper>
          <ErrorDialog
            isOpen={errorDialog.isOpen}
            title={errorDialog.title}
            text={errorDialog.text}
            onCancel={() =>
              setErrorDialog((prevState) => ({ ...prevState, isOpen: false }))
            }
          />
          <AlertDialog
            isOpen={isAlertDialogOpen}
            title="Delete the selected product data?"
            text="You will not be able to recover this data!"
            onDelete={deleteProduct}
            onCancel={() => setIsAlertDialogOpen(false)}
          />
        </>
      )}
    </Box>
  );
}
