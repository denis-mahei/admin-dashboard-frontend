import * as React from "react";
import { Order } from "@/lib/types/definitions";
import TableWrapper from "@/components/table-wrapper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { normalizedDate } from "@/lib/utils/normalizedDate";

type OrdersTableProps = {
  orders: Order[];
};

const statusTypes = {
  Completed: { backgroundColor: "#59B17A1a", color: "#21a550" },
  Delivered: { backgroundColor: "rgb(122 189 149 / 0.1)", color: "#59B17A" },
  Confirmed: { backgroundColor: "#8059E41a", color: "#8059E4" },
  Shipped: { backgroundColor: "#2577e31a", color: "#50a8ff" },
  Pending: { backgroundColor: "#F790421a", color: "#F79042" },
  Processing: { backgroundColor: "#70A6E81a", color: "#2577e3" },
  Cancelled: { backgroundColor: "error.light", color: "error.main" },
} as const;

function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <TableWrapper title={"All Orders"} width={960}>
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
              <Box
                sx={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "36px",
                  height: "36px",
                }}
              >
                <Image src={row.photo} alt={row.name} width={36} height={36} />
              </Box>
              {row.name}
            </TableCell>
            <TableCell>{row.address.split(",")[0]}</TableCell>
            <TableCell>{row.products}</TableCell>
            <TableCell>{normalizedDate(row.order_date)}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  color: statusTypes[row.status].color,
                  py: "4px",
                  px: "13px",
                  borderRadius: "40px",
                  textAlign: "center",
                  backgroundColor: statusTypes[row.status].backgroundColor,
                }}
              >
                {row.status}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
}
export default OrdersTable;
