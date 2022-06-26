import React from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import QueuedJobTable from "./QueuedJobTable";
import AddJob from "./AddJob";
import InspectedJob from "./InspectedJob";

import { TopBorderCard } from "../../../lib/Cards";

export default function Main() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const params = useParams();

  const [inspectedJobID, setInspectedJobID] = React.useState(0);
  const [queuedJobs, setQueuedJobs] = React.useState([]);

  const getQueuedJobs = async () => {
    try {
      const { data } = await axios.get(
        SERVER_URL +
          `/api/product_batches?businessID=${params.businessID}&status=yellow`,
        {
          withCredentials: true,
        }
      );

      setQueuedJobs(data.data);
      setInspectedJobID(data.data[0].product_batch_id);
    } catch (err) {
      if (err.response.status === 401) navigate("/unauthorized");
      else console.log(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        getQueuedJobs();
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      component="main"
      sx={{ backgroundColor: "#F3F3F3" }}
    >
      <Box sx={{ maxWidth: "504px" }}>
        {queuedJobs.length === 0 ? (
          <Box sx={{ marginBottom: "20px" }}>
            <TopBorderCard text="You currently don't have any job scheduled. Add job to get started." />
          </Box>
        ) : (
          <QueuedJobTable
            setInspectedJobID={(jobID) => setInspectedJobID(jobID)}
            queuedJobs={queuedJobs}
          />
        )}

        <AddJob refreshTable={getQueuedJobs} />
      </Box>
      <InspectedJob
        inspectedJobID={inspectedJobID}
        refreshTable={() => {
          getQueuedJobs();
          setInspectedJobID(0);
        }}
      />
    </Stack>
  );
}
