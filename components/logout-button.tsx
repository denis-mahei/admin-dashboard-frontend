"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api/api.client";
import { enqueueSnackbar } from "notistack";
import { Logout } from "@mui/icons-material";

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
        backgroundColor: "custom.accent",
        color: "white",
        boxShadow: "0 -1px 7px 0 rgba(71, 71, 71, 0.05)",
        "&:hover": {
          color: "custom.accent",
        },
      }}
    >
      <Logout />
    </IconButton>
  );
}

export default LogoutButton;
