import * as React from "react";
import type { IncomeExpenses } from "@/lib/types/definitions";
import TableWrapper from "@/components/table-wrapper";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";

type IncomeExpensesProps = {
  expensesData: IncomeExpenses[];
};

const typeStyles = {
  Income: {
    bg: "custom.bgAccent",
    color: "custom.accent",
    line: "none",
  },
  Expense: {
    bg: "custom.bgAccent2",
    color: "custom.accent2",
    line: "none",
  },
  Error: {
    bg: "primary.bgError",
    color: "primary.main",
    line: "line-through",
  },
} as const;

function IncomeExpenses({ expensesData }: IncomeExpensesProps) {
  return (
    <TableWrapper title={"income/expenses"}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  color: "primary.textSecondary",
                  fontWeight: "normal",
                  paddingLeft: 0,
                },
              }}
            >
              <TableCell colSpan={3}>Today</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& .MuiTableCell-root": {
                    fontWeight: 500,
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  },
                }}
              >
                <TableCell
                  sx={{
                    paddingLeft: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      py: "4px",
                      px: "13px",
                      borderRadius: "40px",
                      backgroundColor: typeStyles[row.type].bg,
                      textAlign: "center",
                      color: typeStyles[row.type].color,
                    }}
                  >
                    {row.type}
                  </Typography>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell
                  align={"right"}
                  sx={{
                    paddingRight: 0,
                    textDecoration: typeStyles[row.type].line,
                    color: typeStyles[row.type].color,
                  }}
                >
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
export default IncomeExpenses;
