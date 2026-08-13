"use client";

import * as React from "react";
import TableWrapper from "@/components/table-wrapper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Supplier } from "@/lib/types/definitions";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import SuppliersDialog from "@/components/suppliers/suppliers-dialog";

type SuppliersTableProps = {
  suppliers: Supplier[];
};

const statusState = {
  Active: { backgroundColor: alpha("#59B17A", 0.1), color: "#59B17A" },
  Deactive: { backgroundColor: alpha("#E85050", 0.1), color: "#E85050" },
};

function SuppliersTable({ suppliers }: SuppliersTableProps) {
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const handleClose = () => {
    setEditingSupplier(null);
  };

  return (
    <>
      <TableWrapper title={"All Suppliers"} width={960}>
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
            <TableCell sx={{ paddingLeft: 0 }}>Supplier info</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Delivery date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow
              key={supplier.id}
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
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              <TableCell>{supplier.company}</TableCell>
              <TableCell>
                {new Date(supplier.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{supplier.amount}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    color: statusState[supplier.status].color,
                    py: "4px",
                    px: "13px",
                    borderRadius: "40px",
                    textAlign: "center",
                    backgroundColor:
                      statusState[supplier.status].backgroundColor,
                  }}
                >
                  {supplier.status}
                </Typography>
              </TableCell>
              <TableCell sx={{ maxWidth: "40px", textAlign: "center" }}>
                <IconButton
                  sx={{
                    border: "1px solid",
                    borderColor: alpha("#59B17A", 0.5),
                    borderRadius: "30px",
                    px: "17px",
                    py: "8px",
                  }}
                  onClick={() => setEditingSupplier(supplier)}
                >
                  <EditIcon
                    sx={{ color: "primary.main", fontSize: "14px", mr: 1 }}
                  />
                  <Typography sx={{ color: "primary.main", fontWeight: 500 }}>
                    Edit
                  </Typography>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
      {editingSupplier && (
        <SuppliersDialog
          supplier={editingSupplier}
          onClose={handleClose}
          open={!!editingSupplier}
        />
      )}
    </>
  );
}
export default SuppliersTable;
