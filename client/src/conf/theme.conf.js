import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    black: {
      main: "#000000",
    },
    signatureGreen: {
      main: "#4AF48E",
    },
    yellow: {
      main: "#F4CF4A",
    },
    red: {
      main: "#F44A4A",
    },
    grey: {
      main: "#C6C6C6",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "containedGreen" },
          style: {
            backgroundColor: "#4af48e",
            color: "black",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#4af48e",
            },
          },
        },
        {
          props: { variant: "GeeTableButton" },
          style: {
            fontSize: "10px",
            padding: "3px 7px",
            backgroundColor: "#2264E5",
            color: "white",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "#2264E5",
            },
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "topBorderGreen" },
          style: {
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderTop: "5px solid #4af48e",
          },
        },
      ],
    },
  },
});
