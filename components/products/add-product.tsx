"use client";

import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SvgIcon from "@/components/svg-icon";
import { DialogContent, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export interface CreateProductProps {
  open: boolean;
  onClose: () => void;
}

function CreateProductDialog({ onClose, open }: CreateProductProps) {
  const { control, handleSubmit } = useForm();
  return (
    <Dialog onClose={onClose} open={open} sx={{ borderRadius: 2 }}>
      <Box sx={{ px: "20px", py: "40px" }}>
        <Typography
          component="h2"
          sx={{ fontSize: 24, fontWeight: "bold", mb: "40px" }}
        >
          Add a new product
        </Typography>
        <IconButton
          component="button"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <SvgIcon name="close" width="24" height="24" />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Product Info"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{}}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Product Info"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default function OpenDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "primary.main",
            borderRadius: 60,
            color: "white",
            padding: "13px",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <SvgIcon name="add" width="16" height="16" />
        </IconButton>
        <Typography
          sx={{
            fontSize: "14px",
            color: "text.primary",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Add a new product
        </Typography>
      </Box>
      <CreateProductDialog open={open} onClose={handleClose} />
    </>
  );
}
