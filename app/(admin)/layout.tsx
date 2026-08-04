"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Box from "@mui/material/Box";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Header onToggleDrawer={() => setMobileOpen(!mobileOpen)} />
      <Box sx={{ display: "flex" }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onToggleDrawer={() => setMobileOpen(false)}
        />
        <Box
          component="main"
          sx={{ flexGrow: 1, px: { xs: "20px", md: "40px" }, py: "20px" }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Layout;
