import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

type TableWrapperProps = {
  title: string;
  children: React.ReactNode;
  width?: number;
};

function TableWrapper({ title, children, width }: TableWrapperProps) {
  return (
    <Box
      sx={{
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
        overflow: "hidden",
        borderColor: "secondary.main",
        flexGrow: 1,
      }}
    >
      <Box sx={{ backgroundColor: "primary.light", p: "20px" }}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
      </Box>{" "}
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ minWidth: width }}>
          {children}
        </Table>
      </TableContainer>
    </Box>
  );
}
export default TableWrapper;
