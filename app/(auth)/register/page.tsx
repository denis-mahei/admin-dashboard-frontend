"use client";

import React, { useState } from "react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterValues } from "@/lib/schemas/authSchema";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/lib/api";
import { enqueueSnackbar } from "notistack";

function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      console.log(data);
      enqueueSnackbar("Successfully registered", { variant: "success" });
      router.push("/");
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => registerMutation.mutate(data))}>
      <Stack spacing={2}>
        <Controller
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Name"
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
          name="phone"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Phone"
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
