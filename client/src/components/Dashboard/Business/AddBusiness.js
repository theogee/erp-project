/** @jsxImportSource @emotion/react */
import { default as React, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function AddBusiness() {
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  const onChangeBusinessName = (e) => setBusinessName(e.target.value);
  const onChangeBusinessAddress = (e) => setBusinessAddress(e.target.value);

  const onClickTest = () => console.log(businessName, businessAddress);

  return (
    <Box component="section">
      <h1
        css={{
          paddingLeft: "18px",
          borderLeft: "5px solid #4AF48E",
          marginBottom: "42px",
        }}
      >
        Add Your Business
      </h1>
      <Paper
        component="form"
        autoComplete="off"
        variant="outlined"
        sx={{ width: "457px", height: "230px", padding: "21px 24px" }}
      >
        <Stack justifyContent="space-between" sx={{ height: "100%" }}>
          <TextField
            id="outlined-basic"
            label="Your business name"
            variant="outlined"
            color="black"
            // helperText={businessName === "hello" ? "Incorrect format." : ""}
            // error={businessName === "hello"}
            required
            fullWidth
            onChange={onChangeBusinessName}
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="Your business address"
            variant="outlined"
            color="black"
            required
            fullWidth
            onChange={onChangeBusinessAddress}
            size="small"
          />
          <Button
            variant="containedGreen"
            sx={{ padding: "10px 155px" }}
            onClick={onClickTest}
          >
            Add Business
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
