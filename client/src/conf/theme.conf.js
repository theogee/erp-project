import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    black: {
      main: "#000000",
    },
    signatureGreen: {
      main: "#4AF48E",
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
