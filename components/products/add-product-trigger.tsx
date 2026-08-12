"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@/components/svg-icon";
import Typography from "@mui/material/Typography";
import { Supplier } from "@/lib/types/definitions";
import ProductDialog from "@/components/products/product-dialog";

type OpenDialogProps = {
  suppliers: Supplier[];
};

function OpenDialog({ suppliers }: OpenDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "primary.main",
            borderRadius: 60,
            color: "white",
            padding: "13px",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <SvgIcon name="add" width="16" height="16" />
        </IconButton>
        <Typography
          sx={{
            fontSize: "14px",
            color: "text.primary",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Add new product
        </Typography>
      </Box>
      <ProductDialog open={open} onClose={handleClose} suppliers={suppliers} />
    </>
  );
}

export default OpenDialog;
