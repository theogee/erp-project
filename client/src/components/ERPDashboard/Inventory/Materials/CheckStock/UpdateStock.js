import React from "react";

import { isDecimal } from "validator";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

const REGEX_NUMBER_DOTS = /^[0-9]*\.?[0-9]*$/;

export default function UpdateStock(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [currentQty, setCurrentQty] = React.useState(props.currentQty);
  const [errorCurrentQty, setErrorCurrentQty] = React.useState({
    error: false,
    msg: "",
  });

  React.useEffect(() => {
    if (props.currentQty) setCurrentQty(props.currentQty);
  }, [props.currentQty]);

  const updateStock = async () => {
    let errorMsg;
    if (currentQty || currentQty === 0) {
      if (!isDecimal(currentQty + "")) {
        errorMsg =
          "Qty must be valid number and can only consist 0-9, and dots.";
      }
    } else {
      errorMsg = "Current qty can't be empty.";
    }

    if (errorMsg) {
      setErrorCurrentQty({ error: true, msg: errorMsg });
      return;
    }

    try {
      await axios.put(
        SERVER_URL + `/api/batches/${props.inspectedBatchID}`,
        { currentQty: currentQty },
        {
          withCredentials: true,
        }
      );
      props.refreshData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper variant="customPaper" sx={{ padding: "30px" }}>
      <Stack direction="row" sx={{ marginBottom: "30px" }} columnGap="30px">
        <TextField
          value={currentQty}
          label="Current Qty"
          variant="outlined"
          onChange={(e) => {
            if (e.target.value.match(REGEX_NUMBER_DOTS)) {
              setCurrentQty(e.target.value);
              if (errorCurrentQty.error) {
                setErrorCurrentQty({
                  error: false,
                  msg: "",
                });
              }
            }
          }}
          error={errorCurrentQty.error}
          helperText={errorCurrentQty.msg}
          sx={{ flexGrow: 50 }}
          size="small"
          InputLabelProps={{
            shrink: currentQty ? true : false,
          }}
        />
        <TextField
          value={props.measurementName}
          disabled
          label="Measurement"
          sx={{ flexGrow: 40 }}
          size="small"
          InputLabelProps={{
            shrink: props.measurementName ? true : false,
          }}
        />
      </Stack>
      <Button
        onClick={updateStock}
        variant="containedBlue"
        sx={{ width: "100%", padding: "10px 0" }}
      >
        Update Stock
      </Button>
    </Paper>
  );
}
