"use client";

import * as React from "react";
import { Order } from "@/lib/types/definitions";
import TableWrapper from "@/components/table-wrapper";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";

type OrdersTableProps = {
  orders: Order[];
};

function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <TableWrapper title={"All Orders"}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
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
              <TableCell sx={{ paddingLeft: 0 }}>User info</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Order date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.name}
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
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "start", sm: "center" },
                    gap: 1,
                    paddingLeft: 0,
                  }}
                >
                  <Image
                    src={row.photo}
                    alt={row.name}
                    width={36}
                    height={36}
                  />
                  {row.name}
                </TableCell>
                <TableCell>{row.address.split(",")[0]}</TableCell>
                <TableCell>{row.products}</TableCell>
                <TableCell>
                  {new Date(row.order_date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
export default OrdersTable;
