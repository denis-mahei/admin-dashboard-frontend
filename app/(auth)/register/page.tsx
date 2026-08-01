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
import Box from "@mui/material/Box";
import Link from "@/components/link";

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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: { xs: "10px", sm: "14px" },
          width: { xs: "100%", sm: "600px" },
        }}
      >
        <Controller
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="User name"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
          control={control}
        />
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
          name="phone"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Phone number"
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
            sign up
          </Button>
          <Button
            component={Link}
            href={"/login"}
            variant="text"
            sx={{
              gridColumn: "1",
              fontSize: "12px",
              color: "#1d1e2140",
              fontWeight: "regular",
              textTransform: "none",
            }}
          >
            Already have an account?
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default Page;
