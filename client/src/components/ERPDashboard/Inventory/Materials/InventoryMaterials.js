/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { GeeTable } from "../../../GeeComponents";

import InspectedMaterial from "./InspectedMaterial";
import AddMaterial from "./AddMaterial";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { TopBorderCard } from "../../../lib/Cards";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

export default function InventoryMaterials() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [tableData, setTableData] = React.useState([]);
  const [inspectedMaterialID, setInspectedMaterialID] = React.useState(0);
  const [isAdding, setIsAdding] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState({});

  const getMaterials = async () => {
    try {
      const { data } = await axios.get(
        SERVER_URL + `/api/material?businessID=${params.businessID}`,
        {
          withCredentials: true,
        }
      );

      setTableData(data.data);
      setInspectedMaterialID(data.data[0].material_id);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        getMaterials();
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "NAME", map: "name" },
    { label: "QTY", map: "cummulative_qty", width: "60px" },
    { label: "MEAS.", map: "measurement_name", width: "60px" },
    { label: "STATUS", map: "definedStatus", width: "70px", type: "stock" },
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>Materials</h1>
        {tableData.length === 0 ? (
          <TopBorderCard
            text="You currently don't have any material registered. Add material to get
        started."
          />
        ) : (
          <GeeTable
            tableData={tableData}
            headCells={headCells}
            checkedID="material_id"
            onChecked={(checkedID) => {
              setInspectedMaterialID(checkedID);
              setIsAdding(false);
            }}
            minWidth="504px"
            tableButton={{
              label: "Add material",
              onClick: (newState) => setIsAdding(newState),
            }}
          />
        )}
      </Box>
      <Box sx={{ width: "600px" }}>
        <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
          {isAdding || tableData.length === 0
            ? "Adding Material..."
            : "Inspecting Material..."}
        </h1>
        {isAdding || tableData.length === 0 ? (
          <AddMaterial
            closeView={() => {
              setSnackBar(snackBar);
              setIsAdding(false);
              getMaterials();
            }}
          />
        ) : (
          <InspectedMaterial
            inspectedMaterialID={inspectedMaterialID}
            refresh={getMaterials}
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
