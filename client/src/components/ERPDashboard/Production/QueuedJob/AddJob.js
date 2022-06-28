import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { ErrorDialog } from "../../../lib/Dialog";

import { TopBorderCard } from "../../../lib/Cards";

import {
  jobReducer,
  jobModel,
  getJobPayload,
  validateJob,
  sendJob,
  utils,
} from "../../../lib/form";

export default function AddJob(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = React.useState([]);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = React.useState(false);
  const [errorDialog, setErrorDialog] = React.useState({
    isOpen: false,
    msg: "",
  });

  const [job, jobDispatch] = React.useReducer(
    jobReducer.inputs,
    jobModel.inputs
  );

  const [errorJob, errorJobDispatch] = React.useReducer(
    jobReducer.errors,
    jobModel.errors
  );

  React.useEffect(() => {
    (async () => {
      try {
        const { data: productData } = await axios.get(
          SERVER_URL + `/api/product?businessID=${params.businessID}`,
          {
            withCredentials: true,
          }
        );

        setProduct(productData.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  const addJob = async () => {
    const jobPayload = getJobPayload(job);

    const jobValidationReport = validateJob(jobPayload);

    const error = utils.checkError([jobValidationReport]);

    if (error) {
      utils.showError([jobValidationReport], [errorJobDispatch]);
      return;
    }

    try {
      await sendJob(jobPayload);

      jobDispatch({
        type: "onchange-job-product",
        payload: { id: "", name: "" },
      });
      jobDispatch({
        type: "onchange-job-qty",
        payload: { qty: "" },
      });
      jobDispatch({
        type: "onchange-job-productionDate",
        payload: { productionDate: "" },
      });
      jobDispatch({
        type: "onchange-job-expiryDate",
        payload: { expiryDate: "" },
      });

      props.refreshTable();
    } catch (err) {
      if (err.response.status === 400) {
        setErrorDialog({ isOpen: true, msg: err.response.data.msg });
      }
    }
  };

  return (
    <>
      {product.length === 0 ? (
        <TopBorderCard
          text="You currently don't have any product registered. Add product to get
        started adding job."
        >
          <Button
            variant="containedGreen"
            onClick={() =>
              navigate(`/b/${params.businessID}/dashboard/production`)
            }
          >
            Add Product
          </Button>
        </TopBorderCard>
      ) : (
        <Paper variant="customPaper" sx={{ padding: "30px" }}>
          <TextField
            select
            value={job.product.name}
            required
            fullWidth
            onChange={(e, child) => {
              jobDispatch({
                type: "onchange-job-product",
                payload: { id: child.props.id, name: e.target.value },
              });
              if (errorJob.product.error) {
                utils.resetError("error-product", errorJobDispatch);
              }
            }}
            label="Product"
            error={errorJob.product.error}
            helperText={errorJob.product.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
          >
            {product.map((option) => (
              <MenuItem
                id={option.product_id}
                key={option.product_id}
                value={option.name}
                product_name={option.name}
                product_id={option.product_id}
              >
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={job.qty}
            required
            fullWidth
            onChange={(e) => {
              jobDispatch({
                type: "onchange-job-qty",
                payload: { qty: e.target.value },
              });
              if (errorJob.qty.error) {
                utils.resetError("error-qty", errorJobDispatch);
              }
            }}
            label="Unit"
            error={errorJob.qty.error}
            helperText={errorJob.qty.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
          />
          <TextField
            value={job.productionDate}
            label="Production Date"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              jobDispatch({
                type: "onchange-job-productionDate",
                payload: { productionDate: e.target.value },
              });
              if (errorJob.productionDate.error) {
                utils.resetError("error-productionDate", errorJobDispatch);
              }
            }}
            error={errorJob.productionDate.error}
            helperText={errorJob.productionDate.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={job.expiryDate}
            label="Expiry Date"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={(e) => {
              jobDispatch({
                type: "onchange-job-expiryDate",
                payload: { expiryDate: e.target.value },
              });
              if (errorJob.expiryDate.error) {
                utils.resetError("error-expiryDate", errorJobDispatch);
              }
            }}
            error={errorJob.expiryDate.error}
            helperText={errorJob.expiryDate.msg}
            size="small"
            sx={{ marginBottom: "30px" }}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            onClick={addJob}
            variant="containedBlue"
            sx={{ width: "100%", padding: "10px 0" }}
          >
            Add Job
          </Button>
          <ErrorDialog
            isOpen={errorDialog.isOpen}
            title="Can not add job."
            text={errorDialog.msg}
            onCancel={() =>
              setErrorDialog((prevState) => ({ ...prevState, isOpen: false }))
            }
          />
        </Paper>
      )}
    </>
  );
}
