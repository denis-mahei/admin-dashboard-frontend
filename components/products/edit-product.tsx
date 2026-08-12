"use client";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@/components/svg-icon";
import { DialogContent } from "@mui/material";
import ProductForm from "@/components/products/product-form";
import { JSX } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/lib/api/api.server";
import { Product, ProductRequest, Supplier } from "@/lib/types/definitions";
import { enqueueSnackbar } from "notistack";

type EditProductProps = {
  open: boolean;
  onClose: () => void;
  suppliers: Supplier[];
  product: Product;
};

function EditProduct({
  open,
  onClose,
  suppliers,
  product,
}: EditProductProps): JSX.Element {
  const defaultValues = {
    name: product.name,
    category: product.category,
    stock: product.stock,
    supplierId: product.supplier.id,
    price: product.price,
  };
  const router = useRouter();

  const editMutation = useMutation({
    mutationFn: (payload: ProductRequest) => updateProduct(product.id, payload),
    onSuccess: () => {
      enqueueSnackbar("Product updated successfully.", { variant: "success" });
      onClose();
      router.refresh();
    },
    onError: () => {
      enqueueSnackbar("Failed to update product. Try again.", {
        variant: "error",
      });
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
          Edit product
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
            onSubmit={editMutation.mutate}
            onClose={onClose}
            suppliers={suppliers}
            defaultValues={defaultValues}
            open
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
export default EditProduct;
