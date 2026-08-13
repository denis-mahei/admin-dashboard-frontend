import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Statistics from "@/components/dashboard/statistics";

function DashboardLoading() {
  return (
    <Box sx={{ pt: "20px" }}>
      <Statistics>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={100}
            width={240}
            sx={{ borderRadius: "12px" }}
            animation="wave"
          />
        ))}
      </Statistics>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { lg: "start" },
          gap: "20px",
          width: "100%",
        }}
      >
        <Skeleton
          variant="rounded"
          height={450}
          sx={{ width: "100%", borderRadius: "12px" }}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          height={450}
          sx={{ width: "100%", borderRadius: "12px" }}
          animation="wave"
        />
      </Box>
    </Box>
  );
}

export default DashboardLoading;
