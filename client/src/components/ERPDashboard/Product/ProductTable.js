import { React, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { useOutletContext } from "react-router-dom";

export default function ProductTable() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { user, businessID, stateChanger } = useOutletContext();

  const navigate = useNavigate();

  const [products, setProduct] = useState([]);

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
            onClick={() => stateChanger(false)}
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
              <TableCell align="right">Delete</TableCell>
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
                  {product.production_process}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}