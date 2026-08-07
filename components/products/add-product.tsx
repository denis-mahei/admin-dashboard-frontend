import * as React from "react";
import { Dialog, DialogTitle } from "@mui/material";

type AddProductProps = {
  open: boolean;
  onClose: () => void;
};

function AddProduct({ open, onClose }: AddProductProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle></DialogTitle>
    </Dialog>
  );
}
export default AddProduct;
