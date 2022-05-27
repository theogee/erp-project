import { React, useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useOutletContext } from "react-router-dom";

export default function EditProduct({ id }) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { user, businessID } = useOutletContext();

  const [supplier, setSupplier] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  const handleChangeSupplierName = (e) => {
    setSupplier((oldSupplier) => ({ ...oldSupplier, name: e.target.value }));
  };

  const handleChangeSupplierTelp = (e) => {
    setSupplier((oldSupplier) => ({ ...oldSupplier, telp: e.target.value }));
  };

  const handleChangeSupplierAddress = (e) => {
    setSupplier((oldSupplier) => ({ ...oldSupplier, address: e.target.value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/supplier/${params.supplierID}`,
          {
            withCredentials: true,
          }
        );

        setSupplier(data.data[0]);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
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
          <h2>Edit Supplier</h2>
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
          value={supplier.name}
          focused
          onChange={handleChangeSupplierName}
          md={8}
        />
        <TextField
          label="Phone"
          id="outlined-size-small"
          value={supplier.telp}
          onChange={handleChangeSupplierTelp}
          focused
          md={4}
        />
      </Grid>
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Address"
        multiline
        rows={6}
        value={supplier.address}
        onChange={handleChangeSupplierAddress}
        focused
      />
      <Button
        variant="containedGreen"
        sx={{ padding: "10px 15px" }}
        size="small"
        fullWidth
      >
        Edit Supplier
      </Button>
    </Stack>
  );
}
