"use client";

import * as React from "react";
import { useState } from "react";
import TableWrapper from "@/components/table-wrapper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Product, Supplier } from "@/lib/types/definitions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { alpha } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api/api.client";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import ConfirmDialog from "@/components/confirm-dialog";
import ProductDialog from "@/components/products/product-dialog";

type ProductsTableProps = {
  products: Product[];
  suppliers: Supplier[];
};

function ProductsTable({ suppliers, products }: ProductsTableProps) {
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const handleClose = () => {
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setDeletingProduct(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    deleteMutation.mutate(deletingProduct.id);
    setDeletingProduct(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      enqueueSnackbar("Product deleted successfully.", { variant: "success" });
      router.refresh();
    },
    onError: () => {
      enqueueSnackbar("Failed to delete a product", {
        variant: "error",
      });
    },
  });

  return (
    <>
      <TableWrapper title={"All Products"} width={960}>
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                color: "text.disabled",
                fontWeight: "normal",
              },
              "& .MuiTableCell-root:not(:last-child)": {
                borderRight: "1px solid",
                borderColor: "divider",
              },
              "& .MuiTableCell-root:first-of-type": {
                paddingLeft: 0,
              },
            }}
          >
            <TableCell>Product info</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Suppliers</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& .MuiTableCell-root:not(:last-child)": {
                  borderRight: "1px solid",
                  borderColor: "divider",
                },
                "& .MuiTableCell-root": {
                  fontWeight: 500,
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                },
                "& .MuiTableCell-root:first-of-type": {
                  paddingLeft: 0,
                },
              }}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.supplier.company}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell sx={{ maxWidth: "40px", textAlign: "center" }}>
                <IconButton
                  sx={{
                    border: "1px solid",
                    borderColor: alpha("#59B17A", 0.5),
                    mr: 1,
                  }}
                  onClick={() => setEditingProduct(product)}
                >
                  <EditIcon sx={{ color: "primary.main", fontSize: "16px" }} />
                </IconButton>
                <IconButton
                  sx={{
                    border: "1px solid",
                    borderColor: alpha("#E85050", 0.5),
                    fontSize: "16px",
                  }}
                  onClick={() => {
                    setDeletingProduct(product);
                  }}
                >
                  <DeleteForeverIcon
                    sx={{ color: "error.main", fontSize: "16px" }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
      {editingProduct && (
        <ProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onClose={handleClose}
          suppliers={suppliers}
        />
      )}
      {deleteMutation && (
        <ConfirmDialog
          title={"Delete product?"}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          open={!!deletingProduct}
        />
      )}
    </>
  );
}
export default ProductsTable;
