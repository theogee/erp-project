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
    blue: {
      main: "#2264E5",
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
          props: { variant: "containedPurple" },
          style: {
            backgroundColor: "#8f37b8",
            color: "white",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "#8f37b8",
            },
          },
        },
        {
          props: { variant: "containedBlue" },
          style: {
            backgroundColor: "#0048D9",
            color: "white",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "#0048D9",
            },
          },
        },
        {
          props: { variant: "containedRed" },
          style: {
            backgroundColor: "#FA6868",
            color: "white",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "#FA6868",
            },
          },
        },
        {
          props: { variant: "containedYellow" },
          style: {
            backgroundColor: "#FFF2CC",
            color: "#ed6c02",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "#FFF2CC",
            },
          },
        },
        {
          props: { variant: "containedBlack" },
          style: {
            backgroundColor: "#000000",
            color: "white",
            textTransform: "none",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "#000000",
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
        {
          props: { variant: "topBorderYellow" },
          style: {
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderTop: "5px solid #f4cc4a",
          },
        },
        {
          props: { variant: "customPaper" },
          style: {
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            padding: "15px 30px",
            boxShadow: `0px 0px 0px 0.637838px rgb(152 161 178 / 10%), 0px 0.637838px 2.55135px rgb(69 75 87 / 12%), 0px 0px 1.27568px rgb(0 0 0 / 8%)`,
          },
        },
        {
          props: { variant: "customPaper", code: "inspect" },
          style: {
            fontSize: "13px",
            "& > p": {
              margin: "5px 0",
              fontWeight: "500",
            },
          },
        },
        {
          props: { variant: "elevatedButton" },
          style: {
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            minWidth: "30px",
            minHeight: "30px",
            boxShadow: `0px 0px 0px 0.637838px rgba(152, 161, 178, 0.1),
            0px 0.637838px 2.55135px rgba(69, 75, 87, 0.12),
            0px 0px 1.27568px rgba(0, 0, 0, 0.08)`,
          },
        },
      ],
    },
    MuiAlert: {
      variants: [
        {
          props: { variant: "darkSuccess" },
          style: {
            backgroundColor: "rgb(12, 19, 13)",
            color: "#4af48e",
          },
        },
      ],
    },
  },
});
