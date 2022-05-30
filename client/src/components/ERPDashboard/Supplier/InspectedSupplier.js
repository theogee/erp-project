import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function InspectedSupplier(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const { inspectedSupplierID } = props;

  const [inspectedSupplier, setInspectedSupplier] = React.useState({});

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

  return (
    <Box>
      <Paper variant="customPaper" code="inspect">
        <p>Name: {inspectedSupplier.name}</p>
        <p>Address: {inspectedSupplier.address}</p>
        <p>Telp: {inspectedSupplier.telp}</p>
      </Paper>
    </Box>
  );
}
