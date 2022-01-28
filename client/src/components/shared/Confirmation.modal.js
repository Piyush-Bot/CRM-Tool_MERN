import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@material-ui/core";

const Confirmation = (props) => {
  const { onClose, name, reason, open } = props;
  const handleClose = (e) => {
    onClose(e);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you sure you want to approve?</DialogTitle>
      <DialogContent>
        <div>Name: {name}</div>
        <div>Reason: {reason}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose("Approved")}>Approve</Button>
        <Button onClick={() => handleClose("Close")}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Confirmation;
