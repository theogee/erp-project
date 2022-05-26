import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


import { useOutletContext } from "react-router-dom";

export default function ProductTable() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { user, businessID } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
    })();
  }, []);

  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexGrow="100"
        sx={{ backgroundColor: "black" }}
      >
        <Grid item>
          <h2>Add New Supplier</h2>
        </Grid>
        <Grid item>
          <Button
            //variant="containedGreen"
            variant="outlined"
            sx={{ padding: "10px 15px" }}
            size="small"
            onClick={() => navigate("..")}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          label="Supplier Name"
          id="outlined-size-small"
          placeholder="Insert supplier name"
          md={8}
        />
        <TextField
          label="Phone"
          id="outlined-size-small"
          placeholder="Insert phone number"
          md={4}
        />
      </Grid>
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Address"
        multiline
        rows={6}
        placeholder="Insert supplier address"
      />
      <Button
        variant="containedGreen"
        sx={{ padding: "10px 15px" }}
        size="small"
        fullWidth
      >
        Add Supplier
      </Button>
    </Stack>
  );
}
