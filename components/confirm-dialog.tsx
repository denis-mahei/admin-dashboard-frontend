import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "error.main" | "primary.main";
};

const ConfirmDialog = ({
  onConfirm,
  open,
  title,
  onCancel,
  description,
}: ConfirmDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            p: 2,
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          color: "#333",
          p: 0,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "space-between",
          px: 3,
          pb: 2,
        }}
      >
        <Button
          onClick={onCancel}
          autoFocus
          sx={{
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.light",
            },
          }}
        >
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
