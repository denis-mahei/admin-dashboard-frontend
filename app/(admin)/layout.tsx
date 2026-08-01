"use client";

import React, { useState } from "react";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Layout;
