import React from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import googleIcon from "../images/google.png";

export default function Login() {
  const LoginButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    color: "black",
    borderWidth: "2px",
    "&:hover": { borderWidth: "2px" },
    padding: "10px 87px",
    marginTop: "30px",
  }));

  return (
    <main
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Login to access your account.
        </Typography>
        <LoginButton
          variant="outlined"
          startIcon={<img src={googleIcon} alt="" />}
        >
          Login with Google
        </LoginButton>
      </Box>
    </main>
  );
}
