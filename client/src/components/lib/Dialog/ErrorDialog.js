import React from "react";

import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledButton = styled(Button)`
  font-weight: 500;
`;

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            color="warning"
            sx={{ "&:hover": { backgroundColor: "#FFF2CC" } }}
            onClick={props.onCancel}
          >
            OK
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
