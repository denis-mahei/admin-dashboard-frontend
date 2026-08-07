"use client";

import * as React from "react";
import TableWrapper from "@/components/table-wrapper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Product } from "@/lib/types/definitions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";

type ProductsTableProps = {
  products: Product[];
};

function ProductsTable({ products }: ProductsTableProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
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
          {products.map((row) => (
            <TableRow
              key={row.id}
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.supplier.company}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <Button
                  sx={{ borderRadius: 100, p: 1 }}
                  onClick={() => console.log(row.id)}
                >
                  <EditIcon sx={{ color: "primary", fontSize: "16px" }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
    </>
  );
}
export default ProductsTable;
