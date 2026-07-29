"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import LogoImage from "@/components/header/logo-image";
import { usePathname } from "next/navigation";
import { pages } from "@/components/header/sidebar";
import LogoutButton from "@/components/header/logout-button";

interface Props {
  onToggleDrawer: () => void;
}

function ResponsiveAppBar({ onToggleDrawer }: Props) {
  const pathname = usePathname();
  return (
    <AppBar position="static">
      <>
        <Toolbar
          variant="regular"
          sx={{
            alignItems: "center",
            gap: { xs: "20px" },
            paddingX: { xs: "20px", sm: "32px", md: "20px" },
            paddingY: { xs: "18px", md: "15px" },
          }}
        >
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={onToggleDrawer} sx={{ padding: 0 }}>
              <MenuIcon sx={{ fontSize: "32px", color: "#1D1E21" }} />
            </IconButton>
          </Box>

          <LogoImage />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: "20px", md: "24px" },
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Medicine Store
            </Typography>
            {pages.map(
              (page) =>
                pathname === page.path && (
                  <Typography
                    key={page.name}
                    component="p"
                    sx={{ fontSize: "12px", color: "rgba(29, 30, 33, 0.4)" }}
                  >
                    {page.name} | vendor@gmail.com
                  </Typography>
                ),
            )}
          </Box>
          <LogoutButton />
        </Toolbar>
      </>
    </AppBar>
  );
}
export default ResponsiveAppBar;
