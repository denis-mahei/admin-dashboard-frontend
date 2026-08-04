import * as React from "react";
import Box from "@mui/material/Box";

type StatisticsProps = {
  children: React.ReactNode;
};

function Statistics({ children }: StatisticsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        gap: "20px",
        mb: "40px",
      }}
    >
      {children}
    </Box>
  );
}
export default Statistics;
