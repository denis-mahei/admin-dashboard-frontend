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
import EditProduct from "@/components/products/edit-product";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api/api.server";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

type ProductsTableProps = {
  products: Product[];
  suppliers: Supplier[];
};

function ProductsTable({ suppliers, products }: ProductsTableProps) {
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleClose = () => {
    setEditingProduct(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      enqueueSnackbar("Product deleted successfully.", { variant: "success" });
      router.refresh();
    },
    onError: () => {
      enqueueSnackbar("Failed to delete a product with error", {
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
            }}
          >
            <TableCell sx={{ paddingLeft: 0 }}>Product info</TableCell>
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
                    if (confirm("You sure you want to delete this product?"))
                      deleteMutation.mutate(product.id);
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
        <EditProduct
          product={editingProduct}
          open={!!editingProduct}
          onClose={handleClose}
          suppliers={suppliers}
        />
      )}
    </>
  );
}
export default ProductsTable;
