/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

import { GeeTable } from "../../../GeeComponents";

import { formatDate, formatPrice } from "../../../lib/utils";
import { TopBorderCard2 } from "../../../lib/Cards";

export default function InspectedProduct(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [inspectedProduct, setInspectedProduct] = React.useState({});
  const [inspectedProductBatches, setInspectedProductBatches] = React.useState(
    []
  );

  const { inspectedProductID } = props;

  React.useEffect(() => {
    (async () => {
      try {
        const getProduct = () =>
          axios.get(SERVER_URL + `/api/product/${inspectedProductID}`, {
            withCredentials: true,
          });

        const getProductBatches = () =>
          axios.get(
            SERVER_URL +
              `/api/product_batches/p/${inspectedProductID}?status=green`,
            { withCredentials: true }
          );

        const [{ data: product }, { data: productBatches }] = await Promise.all(
          [getProduct(), getProductBatches()]
        );

        setInspectedProduct(product.data);

        productBatches.data = productBatches.data.filter((b) => b.qty !== 0);

        productBatches.data.forEach((pb) => {
          pb.production_date = formatDate(pb.production_date);
          pb.expiry_date = formatDate(pb.expiry_date);
        });

        setInspectedProductBatches(productBatches.data);
      } catch (err) {
        if (err.response?.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedProductID]);

  const calcTotalQty = () => {
    return inspectedProductBatches.reduce(
      (prev, current) => prev + current.qty,
      0
    );
  };

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "PRO. DATE", map: "production_date", width: "20px" },
    { label: "EX. DATE", map: "expiry_date", width: "150px" },
    { label: "QTY", map: "qty", width: "50px" },
  ];

  return (
    <Box sx={{ minWidth: "600px" }}>
      {inspectedProductID !== 0 && (
        <>
          <h1 css={{ fontSize: "20px", marginBottom: "20px" }}>
            Inspecting Product...
          </h1>
          <Paper
            variant="customPaper"
            code="inspect"
            sx={{ position: "relative" }}
          >
            <p>Name: {inspectedProduct?.name}</p>
            <p>Total Qty: {calcTotalQty()}</p>
            <p>Price/Unit: {formatPrice(inspectedProduct?.price || 0)}</p>
            {inspectedProductBatches.length !== 0 && (
              <Button
                variant="GeeTableButton"
                startIcon={<CheckIcon />}
                sx={{
                  padding: "5px 10px",
                  position: "absolute",
                  top: "-40px",
                  right: "10px",
                }}
                onClick={() => navigate(`${inspectedProductID}/checkstock`)}
              >
                check stock
              </Button>
            )}
          </Paper>
          <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Refill Batches</h2>
          {inspectedProductBatches.length === 0 ? (
            <TopBorderCard2
              variant="topBorderYellow"
              text="Currently there are no stock available for this product. Refill this product to use."
            >
              <Button
                variant="containedYellow"
                onClick={() =>
                  navigate(`/b/${params.businessID}/dashboard/production/jobs`)
                }
              >
                Refill product
              </Button>
            </TopBorderCard2>
          ) : (
            <GeeTable
              tableData={inspectedProductBatches}
              headCells={headCells}
              minWidth="100%"
              checkedID="product_batch_id"
              onChecked={(productBatchID) => {}}
              tableButton={{
                label: "Refill product",
                onClick: () => {
                  navigate(`/b/${params.businessID}/dashboard/production/jobs`);
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  );
}
