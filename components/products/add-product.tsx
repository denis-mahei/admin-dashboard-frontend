"use client";

import * as React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SvgIcon from "@/components/svg-icon";
import {
  Button,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/schemas/productSchema";
import { Categories } from "@/lib/types/definitions";
import { useMutation } from "@tanstack/react-query";
import { addNewProduct } from "@/lib/api/api.server";
import { useRouter } from "next/navigation";

export interface CreateProductProps {
  open: boolean;
  onClose: () => void;
}

function CreateProductDialog({ onClose, open }: CreateProductProps) {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: Categories[0],
      stock: 0,
      supplier: "",
      price: 0,
    },
    mode: "onBlur",
  });

  const createMutation = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });
  return (
    <Dialog
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "12px",
          },
        },
      }}
    >
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
          <form onSubmit={handleSubmit(createMutation.mutate)}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                pt: 1,
                mb: "40px",
              }}
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
                    sx={{
                      borderRadius: "60px",
                    }}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Category</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={field.value}
                      onChange={field.onChange}
                      label="Category"
                      sx={{ borderRadius: "60px" }}
                      MenuProps={{
                        slotProps: {
                          paper: {
                            sx: {
                              backgroundColor: "primary.main",
                              color: "#fff",
                              mt: 1,
                              borderRadius: "15px",
                              maxHeight: 140,
                              overflow: "auto",
                            },
                          },
                        },
                      }}
                    >
                      {Categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="stock"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Stock"
                    type="number"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="supplier"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Supplier"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Price"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1, py: 1 }}>
              <Button
                type="submit"
                component={"button"}
                variant="contained"
                sx={{
                  borderRadius: "60px",
                  textTransform: "none",
                  color: "#fff",
                  py: "13px",
                  px: "52px",
                  maxHeight: "44px",
                }}
              >
                Add
              </Button>
              <Button
                type="button"
                component={"button"}
                variant="contained"
                onClick={onClose}
                sx={{
                  backgroundColor: "text.secondary",
                  borderRadius: "60px",
                  textTransform: "none",
                  color: "text.disabled",
                  py: "13px",
                  px: "52px",
                  maxHeight: "44px",
                  maxWidth: "133px",
                }}
              >
                Cancel
              </Button>
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
