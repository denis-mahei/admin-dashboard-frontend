import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type TableWrapperProps = {
  title: string;
  children: React.ReactNode;
};

function TableWrapper({ title, children }: TableWrapperProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 2,
        overflow: "hidden",
        borderColor: "secondary.main",
        flexGrow: 1,
      }}
    >
      <Box sx={{ backgroundColor: "primary.tableHeader", p: "20px" }}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
export default TableWrapper;
