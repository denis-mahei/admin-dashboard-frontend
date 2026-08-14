import * as React from "react";
import { Customer } from "@/lib/types/definitions";
import TableWrapper from "@/components/table-wrapper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { normalizedDate } from "@/lib/utils/normalizedDate";

type CustomersTableProps = {
  customers: Customer[];
};

function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <TableWrapper title={"All Customers"}>
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
          <TableCell sx={{ paddingLeft: 0 }}>Customers info</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Register date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.id}
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
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{normalizedDate(customer.register_date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
}
export default CustomersTable;
