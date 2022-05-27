import { React, useState, useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FileOpenIcon from "@mui/icons-material/FileOpen";

export default function ProductTable() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { user, businessID } = useOutletContext();

  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(false);
  };

  const handleModalOpen = () => {
    setModal(true);
  };
  
  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/supplier?businessID=${businessID}`,
          {
            withCredentials: true,
          }
        );

        console.log(data.data);

        setSuppliers(data.data);
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
          <h2>Supplier List</h2>
        </Grid>
        <Grid item>
          <Button
            variant="containedGreen"
            sx={{ padding: "10px 15px" }}
            size="small"
            onClick={() => navigate("add")}
          >
            Add New Supplier
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Supplier Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier.supplier_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {supplier.name}
                </TableCell>
                <TableCell align="right">{supplier.address}</TableCell>
                <TableCell align="right">
                  <Typography>
                    {supplier.telp}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button size="small">
                    <ModeEditIcon 
                      onClick={ () => {handleEdit(supplier.supplier_id)}}
                    />
                  </Button>
                  <Button size="small">
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog onClose={handleModalClose} open={modal}>
        <DialogTitle variant="h4">Production Process</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h4">Product Name</Typography>
            <Typography>Production process text</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
