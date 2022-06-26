import React from "react";

import { isAuth } from "../../lib/utils";

import {
  FormColumn,
  FormSection,
  FormRow,
  FormTitle,
  FormButton,
} from "./FormStyles";
import { Container } from "../../../globalStyles";
import googleIcon from "../images/google.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Login() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const authenticated = await isAuth();
      if (authenticated) navigate("/dashboard");
    })();
  }, []);

  const login = () => {
    window.open(SERVER_URL + "/auth/google", "_self");
  };
  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Login</FormTitle>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                Login to access your account.
              </Typography>
              <FormButton
                variant="outlined"
                startIcon={<img src={googleIcon} alt="" />}
                onClick={login}
              >
                Login with Google
              </FormButton>
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
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
}
