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
      if (data.role === "CUSTOMER") router.push("/");
      else router.push("/dashboard");
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
              label="Email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                "& .MuiInputLabel-root": {
                  top: -4,
                },
                "& .MuiInputLabel-shrink": {
                  top: 0,
                },
              }}
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
              sx={{
                "& .MuiInputLabel-root": {
                  top: -4,
                },
                "& .MuiInputLabel-shrink": {
                  top: 0,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: "16px" }} />
                        ) : (
                          <Visibility sx={{ fontSize: "16px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "40px !important",
            backgroundColor: "custom.accent",
            borderRadius: 12,
          }}
        >
          sign in
        </Button>
      </Stack>
    </form>
  );
}

export default Page;
