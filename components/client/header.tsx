import * as React from "react";
import Box from "@mui/material/Box";
import Logo from "@/components/client/logo-image";
import { HeaderMenu } from "@/components/client/menu";
import AuthButton from "@/components/client/auth-button";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: "custom.accent",
      }}
    >
      <Logo variant={"white"} />
      <HeaderMenu />
      <AuthButton />
    </Box>
  );
}
export default Header;
