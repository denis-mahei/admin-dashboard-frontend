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
import TableWrapper from "@/components/table-wrapper";

type RecentCustomersProps = {
  recentCustomers: Customer[];
};

function RecentCustomers({ recentCustomers }: RecentCustomersProps) {
  return (
    <TableWrapper title={"Recent customers"}>
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
              <TableCell sx={{ paddingLeft: 0 }}>Name</TableCell>
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
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.spent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
export default RecentCustomers;
