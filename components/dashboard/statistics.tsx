import * as React from "react";
import Box from "@mui/material/Box";

type StatisticsProps = {
  children: React.ReactNode;
};

function Statistics({ children }: StatisticsProps) {
  return <Box sx={{ display: "flex", gap: "20px" }}>{children}</Box>;
}
export default Statistics;
