import React from "react";

import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";

//USAGE: open, title, text and onClose must me supplied
export default function TextDialog(props) {
  const handleClose = () => {
    if (props.onClose) props.onClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          <Grid container justify="center" style={{ padding: "1rem" }}>
            <CircularProgress />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
