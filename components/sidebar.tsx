"use client";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemIcon } from "@mui/material";
import Link from "@/components/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ScienceIcon from "@mui/icons-material/Science";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import LogoutButton from "@/components/logout-button";

export const pages = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  { path: "/orders", name: "All Orders", icon: <ShoppingCartIcon /> },
  { path: "/products", name: "All Products", icon: <ScienceIcon /> },
  {
    path: "/suppliers",
    name: "All Suppliers",
    icon: <LocalPharmacyIcon />,
  },
  {
    path: "/customers",
    name: "All Customers",
    icon: <PeopleAltIcon />,
  },
] as const;

interface Props {
  mobileOpen: boolean;
  onToggleDrawer: () => void;
}

function Sidebar({ mobileOpen, onToggleDrawer }: Props) {
  const pathname = usePathname();
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onToggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            paddingY: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ alignSelf: "end", paddingRight: "14px" }}>
              <CloseIcon onClick={onToggleDrawer} sx={{ fontSize: "32px" }} />
            </Box>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                alignItems: "center",
                paddingX: "18px",
                paddingTop: "48px",
              }}
            >
              {pages.map((page) => (
                <ListItem
                  key={page.path}
                  sx={{ alignSelf: "center", padding: 0, width: "40px" }}
                >
                  <ListItemButton
                    component={Link}
                    href={page.path}
                    sx={{
                      borderRadius: "50%",
                      paddingX: 2,
                      paddingY: 1,
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      boxShadow: "0 -1px 7px 0 rgba(71, 71, 71, 0.05)",
                    }}
                    onClick={onToggleDrawer}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "auto",
                        color: pathname.endsWith(page.path)
                          ? "primary.main"
                          : "action.disabled",
                      }}
                    >
                      {page.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LogoutButton />
          </Box>
        </Box>
      </Drawer>
      <Drawer
        variant="permanent"
        open={mobileOpen}
        onClose={onToggleDrawer}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: 80,
            position: "relative",
            height: "100%",
            backgroundColor: "transparent",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "center",
            minHeight: "calc(100vh - 81px)",
            paddingX: "18px",
            paddingY: "40px",
          }}
        >
          {pages.map((page) => (
            <ListItem
              key={page.path}
              sx={{ alignSelf: "center", padding: 0, width: "40px" }}
            >
              <ListItemButton
                component={Link}
                href={page.path}
                sx={{
                  borderRadius: "50%",
                  paddingX: 2,
                  paddingY: 1,
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0 -1px 7px 0 rgba(71, 71, 71, 0.05)",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "auto",
                    color: pathname.endsWith(page.path)
                      ? "primary.main"
                      : "action.disabled",
                  }}
                >
                  {page.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
