import * as React from "react";
import {
  Categories,
  Product,
  ProductRequest,
  Supplier,
} from "@/lib/types/definitions";
import { useMutation } from "@tanstack/react-query";
import { addNewProduct, updateProduct } from "@/lib/api/api.client";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@/components/svg-icon";
import DialogContent from "@mui/material/DialogContent";
import ProductForm from "@/components/products/product-form";

type ProductDialogProps = {
  open: boolean;
  onClose: () => void;
  suppliers: Supplier[];
  product?: Product;
};

function ProductDialog({
  open,
  onClose,
  product,
  suppliers,
}: ProductDialogProps) {
  const router = useRouter();
  const isEditing = !!product;
  const defaultValues = product
    ? {
        name: product.name,
        category: product.category,
        stock: product.stock,
        supplierId: product.supplier.id,
        price: product.price,
      }
    : {
        name: "",
        category: Categories[0],
        stock: 0,
        supplierId: suppliers[0]?.id,
        price: 0,
      };

  const mutation = useMutation({
    mutationFn: (payload: ProductRequest) =>
      isEditing ? updateProduct(product.id, payload) : addNewProduct(payload),
    onSuccess: () => {
      enqueueSnackbar(isEditing ? "Product updated." : "Product added.", {
        variant: "success",
      });
      onClose();
      router.refresh();
    },
    onError: () => {
      enqueueSnackbar(
        isEditing ? "Failed to update product." : "Failed to add product.",
        { variant: "error" },
      );
    },
  });
  return (
    <Dialog
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: { borderRadius: "12px" },
        },
      }}
    >
      <Box sx={{ px: "20px", py: "40px" }}>
        <Typography
          component="h2"
          sx={{ fontSize: 24, fontWeight: "bold", mb: "40px" }}
        >
          {isEditing ? "Edit product" : "Add a new product"}
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
            onSubmit={mutation.mutate}
            onClose={onClose}
            suppliers={suppliers}
            defaultValues={defaultValues}
            isEditing={isEditing}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
export default ProductDialog;
