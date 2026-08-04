import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Customer } from "@/lib/types/definitions";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type RecentCustomersProps = {
  recentCustomers: Customer[];
};

function RecentCustomers({ recentCustomers }: RecentCustomersProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 2,
        overflow: "hidden",
        borderColor: "secondary.main",
        maxWidth: "630px",
      }}
    >
      <Box sx={{ backgroundColor: "primary.tableHeader", p: "20px" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Recent Customers
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  color: "primary.textSecondary",
                  fontWeight: "normal",
                },
                "& .MuiTableCell-root:not(:last-child)": {
                  borderRight: "1px solid",
                  borderColor: "divider",
                },
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentCustomers.map((row) => (
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
                <TableCell sx>{row.email}</TableCell>
                <TableCell>{row.spent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default RecentCustomers;
