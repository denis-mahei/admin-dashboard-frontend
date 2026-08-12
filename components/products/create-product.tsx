"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SvgIcon from "@/components/svg-icon";
import { DialogContent } from "@mui/material";
import { Categories, Supplier } from "@/lib/types/definitions";
import { useMutation } from "@tanstack/react-query";
import { addNewProduct } from "@/lib/api/api.server";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/product-form";
import { enqueueSnackbar } from "notistack";

export interface CreateProductProps {
  open: boolean;
  onClose: () => void;
  suppliers: Supplier[];
}

function CreateProduct({ onClose, open, suppliers }: CreateProductProps) {
  const defaultValues = {
    name: "",
    category: Categories[0],
    stock: 0,
    supplierId: suppliers[0]?.id,
    price: 0,
  };
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      enqueueSnackbar("Product was added successfully.", {
        variant: "success",
      });
      onClose();
      router.refresh();
    },
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "12px",
          },
        },
      }}
    >
      <Box sx={{ px: "20px", py: "40px" }}>
        <Typography
          component="h2"
          sx={{ fontSize: 24, fontWeight: "bold", mb: "40px" }}
        >
          Add a new product
        </Typography>
        <IconButton
          component="button"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <SvgIcon name="close" width="24" height="24" />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <ProductForm
            onSubmit={createMutation.mutate}
            onClose={onClose}
            suppliers={suppliers}
            defaultValues={defaultValues}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default CreateProduct;
