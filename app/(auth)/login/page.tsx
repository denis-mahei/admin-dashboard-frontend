"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginValues } from "@/lib/schemas/authSchema";
import { Button, Stack, TextField } from "@mui/material";

function Page() {
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });
  return (
    <form onSubmit={handleSubmit}>
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
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
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
