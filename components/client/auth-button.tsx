"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Link from "@/components/link";

function AuthButton() {
  return (
    <Box sx={{ display: "flex", gap: "14px" }}>
      <Button
        component={Link}
        href={"/register"}
        variant="outlined"
        sx={{ color: "#f1f1f1", textTransform: "capitalize" }}
      >
        Register
      </Button>
    </Box>
  );
}
export default AuthButton;
