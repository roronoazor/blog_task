import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PostDeleteModalProps } from "@/interfaces/post";
import { LoadingButton } from "@mui/lab";

export default function DeletePostDialog({
  post,
  open,
  handleClose,
  handleSubmit,
  loading,
}: PostDeleteModalProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the post "{`${post?.title}`}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <LoadingButton loading={loading} onClick={handleSubmit} autoFocus>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
