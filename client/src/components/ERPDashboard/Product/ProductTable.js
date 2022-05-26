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

  const [products, setProduct] = useState([]);
  const [modal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(false);
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          SERVER_URL + `/api/product?businessID=${businessID}`,
          {
            withCredentials: true,
          }
        );

        console.log(data.data);

        setProduct(data.data);
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
          <h2>Product List</h2>
        </Grid>
        <Grid item>
          <Button
            variant="containedGreen"
            sx={{ padding: "10px 15px" }}
            size="small"
            onClick={() => navigate("add")}
          >
            Add New Product
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Production Process</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  <Button size="small">
                    <FileOpenIcon onClick={handleModalOpen} />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button size="small">
                    <ModeEditIcon />
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
