import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { useOutletContext } from "react-router-dom";
import {
  Paper,
  Stack,
  Grid,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardActions,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Pos() {
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

  const handleFinishTransaction = () => {
    handleModalClose();
  };

  const date = new Date();
  const today =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

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
    <Stack>
      <h1>Point of Sales</h1>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <TextField
            label="Client Name"
            id="outlined-size-small"
            placeholder="Insert client name"
            md={4}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Date"
            id="outlined-size-small"
            defaultValue={today}
            md={4}
          />
        </Grid>
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {products.map((product) => (
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="div">
                  {product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Rp.{product.price},-
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <RemoveIcon />
                </Button>
                <Typography>0</Typography>
                <Button size="small">
                  <AddIcon />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
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
                <TableCell align="right">
                  <Typography>0</Typography>
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">
                  <Button size="small">
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        variant="containedGreen"
        sx={{ padding: "10px 15px" }}
        size="small"
        fullWidth
        onClick={handleModalOpen}
      >
        Quote the order
      </Button>
      <Dialog onClose={handleModalClose} open={modal}>
        <DialogTitle variant="h3">Bill of Receipt</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Client name - Date
          </DialogContentText>
          <Typography variant="h4">Rp.xxx.xxx,-</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFinishTransaction}>Finish transaction</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
