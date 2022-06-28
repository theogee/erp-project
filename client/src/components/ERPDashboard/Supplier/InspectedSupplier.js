import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";

import { AlertDialog, ErrorDialog } from "../../lib/Dialog";

export default function InspectedSupplier(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const { inspectedSupplierID } = props;

  const [inspectedSupplier, setInspectedSupplier] = React.useState({});
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const { data: supplierData } = await axios.get(
          SERVER_URL + `/api/supplier/${inspectedSupplierID}`,
          {
            withCredentials: true,
          }
        );

        setInspectedSupplier(supplierData.data[0]);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedSupplierID]);

  const deleteSupplier = async () => {
    try {
      await axios.delete(SERVER_URL + `/api/supplier/${inspectedSupplierID}`, {
        withCredentials: true,
      });

      props.refresh();
    } catch (err) {
      // there exist batches which depends on the supplierID
      if (err.response.data.msg.code === "23503") setIsErrorDialogOpen(true);
      else console.log(err);
    }
  };

  return (
    <Paper variant="customPaper" code="inspect" sx={{ position: "relative" }}>
      <p>Name: {inspectedSupplier.name}</p>
      <p>Address: {inspectedSupplier.address}</p>
      <p>Telp: {inspectedSupplier.telp}</p>
      <Stack
        direction="row"
        sx={{ width: "90px", position: "absolute", right: "10px", top: "10px" }}
        justifyContent="space-between"
      >
        <Paper
          variant="elevatedButton"
          onClick={() => navigate(`${inspectedSupplierID}/edit`)}
          component={Button}
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
      <AlertDialog
        isOpen={isAlertDialogOpen}
        title="Delete the selected supplier data?"
        text="You will not be able to recover this data!"
        onDelete={deleteSupplier}
        onCancel={() => setIsAlertDialogOpen(false)}
      />
      <ErrorDialog
        isOpen={isErrorDialogOpen}
        title="Can not delete supplier data."
        text="There exist one or more batch data which rely on this supplier data. Delete all batches which come from this supplier and try again."
        onCancel={() => setIsErrorDialogOpen(false)}
      />
    </Paper>
  );
}
