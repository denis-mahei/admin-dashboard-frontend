"use client";

import { Box, Button } from "@mui/material";

export const HeaderMenu = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        padding: "6px",
        backgroundImage: "url(/assets/menu-bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Button
        disableRipple
        sx={{
          backgroundColor: "custom.accent",
          color: "white",
          borderRadius: "20px",
          textTransform: "none",
          px: 3,
          "&:hover": { bgcolor: "#45966c" },
        }}
      >
        Home
      </Button>

      <Button
        sx={{
          color: "#8A94A6",
          textTransform: "none",
          px: 3,
          borderRadius: "20px",
        }}
      >
        Medicine store
      </Button>

      <Button
        sx={{
          color: "#8A94A6",
          textTransform: "none",
          px: 3,
          borderRadius: "20px",
        }}
      >
        Medicine
      </Button>
    </Box>
  );
};
