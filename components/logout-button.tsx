"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api/api.client";
import { enqueueSnackbar } from "notistack";
import SvgIcon from "@/components/svg-icon";

function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login");
      enqueueSnackbar("Logout successful", { variant: "success" });
    },
  });
  return (
    <IconButton
      onClick={() => logoutMutation.mutate()}
      sx={{
        borderRadius: "100%",
        width: "44px",
        height: "44px",
        backgroundColor: "primary.main",
        color: "white",
        boxShadow: "0 -1px 7px 0 rgba(71, 71, 71, 0.05)",
        transition: "background 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
    >
      <SvgIcon name={"logout"} width={"16"} height={"16"} />
    </IconButton>
  );
}

export default LogoutButton;
