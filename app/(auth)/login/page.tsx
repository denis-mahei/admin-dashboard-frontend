"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValues } from "@/lib/schemas/authSchema";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/lib/api";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Box from "@mui/material/Box";
import Link from "@/components/link";

function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      enqueueSnackbar("Login successful", { variant: "success" });
      if (data.role === "ADMIN") router.push("/dashboard");
      else router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401)
          enqueueSnackbar("Invalid credentials", { variant: "error" });
        if (status === 500)
          enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
      <Stack spacing={2}>
        <Controller
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email address"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: "18px" }} />
                        ) : (
                          <Visibility sx={{ fontSize: "18px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "14px", mt: 8 }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              gridColumn: "1",
              alignItems: "center",
              backgroundColor: "custom.accent",
              borderRadius: 12,
              height: 44,
            }}
          >
            sign in
          </Button>
          <Button
            component={Link}
            href={"/register"}
            variant="text"
            sx={{
              gridColumn: "1",
              fontSize: "12px",
              color: "#1d1e2140",
              fontWeight: "regular",
              textTransform: "none",
            }}
          >
            Don&#39;t have an account?
          </Button>
        </Box>
      </Stack>
    </form>
  );
}

export default Page;
