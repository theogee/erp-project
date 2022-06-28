/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { GeeTable } from "../../GeeComponents";

import InspectedSupplier from "./InspectedSupplier";
import AddSupplier from "./AddSupplier";
import { TopBorderCard } from "../../lib/Cards";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

export default function Supplier() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [tableData, setTableData] = React.useState([]);
  const [inspectedSupplierID, setInspectedSupplierID] = React.useState(0);
  const [isAdding, setIsAdding] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState({});

  const params = useParams();
  const navigate = useNavigate();

  const getSuppliers = async () => {
    try {
      const { data } = await axios.get(
        SERVER_URL + `/api/supplier?businessID=${params.businessID}`,
        {
          withCredentials: true,
        }
      );

      setTableData(data.data);
      setInspectedSupplierID(data.data[0].supplier_id);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        getSuppliers();
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Supplier</h1>
        {tableData.length === 0 ? (
          <TopBorderCard
            text="You currently doesn't have any supplier registered. Add supplier to get
        started."
          />
        ) : (
          <GeeTable
            tableData={tableData}
            headCells={headCells}
            checkedID="supplier_id"
            onChecked={setInspectedSupplierID}
            minWidth="504px"
            tableButton={{
              label: "Add supplier",
              onClick: (newState) => setIsAdding(newState),
            }}
          />
        )}
      </Box>
      <Box sx={{ width: "600px" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          {isAdding || tableData.length === 0
            ? "Adding Supplier..."
            : "Inspecting Supplier..."}
        </h1>
        {isAdding || tableData.length === 0 ? (
          <AddSupplier
            closeView={(snackBar) => {
              setSnackBar(snackBar);
              setIsAdding(false);
              getSuppliers();
            }}
          />
        ) : (
          <InspectedSupplier
            inspectedSupplierID={inspectedSupplierID}
            refresh={() => getSuppliers()}
          />
        )}
      </Box>
      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBar({ isOpen: false })}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={() => setSnackBar({ isOpen: false })}
          severity={snackBar.severity}
          variant={snackBar.variant}
          sx={{ width: "100%" }}
        >
          {snackBar.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
