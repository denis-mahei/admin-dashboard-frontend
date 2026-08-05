import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type StatisticsItemProps = {
  title: string;
  icon: React.ReactNode;
  value: number | string;
};

function StatisticsItem({ title, icon, value }: StatisticsItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "18px",
        py: "14px",
        width: { xs: "158px", sm: "221px", lg: "240px" },
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: "28px" }}
      >
        {icon}
        <Typography
          component={"h3"}
          sx={{ color: "text.disabled", fontSize: "12px" }}
        >
          {title}
        </Typography>
      </Box>
      <Typography component={"p"} sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
  );
}
export default StatisticsItem;
