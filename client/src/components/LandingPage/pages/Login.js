import React from "react";

import { isAuth } from "../components/lib/utils";

import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import googleIcon from "../images/google.png";

export default function Login() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const authenticated = await isAuth();
      if (authenticated) navigate("/dashboard");
    })();
  }, []);

  const LoginButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    color: "black",
    borderWidth: "2px",
    "&:hover": { borderWidth: "2px" },
    padding: "10px 87px",
    marginTop: "30px",
  }));

  const login = () => {
    window.open(SERVER_URL + "/auth/google", "_self");
  };

  return (
    <main
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Login to access your account.
        </Typography>
        <LoginButton
          variant="outlined"
          startIcon={<img src={googleIcon} alt="" />}
          onClick={login}
        >
          Login with Google
        </LoginButton>
      </Box>
      <Link
        sx={{
          fontFamily: "default",
          fontWeight: "bold",
          fontSize: "13px",
          marginTop: "30px",
        }}
        component={RouterLink}
        to="/"
        underline="none"
      >
        Back to Home
      </Link>
    </main>
  );
}
