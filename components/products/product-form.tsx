"use client";

import * as React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { Categories, Supplier } from "@/lib/types/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductValues } from "@/lib/schemas/productSchema";

type ProductFormProps = {
  onClose?: () => void;
  onSubmit: (data: ProductValues) => void;
  suppliers: Supplier[];
  defaultValues: ProductValues;
  open?: boolean;
};

const slotProps = {
  htmlInput: {
    step: 0.01,
    min: 0,
  },
};

function ProductForm({
  onSubmit,
  onClose,
  suppliers,
  defaultValues,
  open,
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="select-label">Category</InputLabel>
              <Select
                error={!!fieldState.error}
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
              <FormHelperText>
                {fieldState.error?.message ?? " "}
              </FormHelperText>
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
              slotProps={{
                htmlInput: {
                  step: 1,
                  min: 0,
                },
              }}
              type="number"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="supplierId"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="select-company-label">Suppliers</InputLabel>
              <Select
                labelId="select-company-label"
                id="select-company"
                value={field.value}
                onChange={field.onChange}
                label="Suppliers"
                sx={{ borderRadius: "60px" }}
                error={!!fieldState.error}
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
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    {supplier.company}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="number"
              slotProps={slotProps}
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
          component="button"
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
          {open ? "Save" : "Add"}
        </Button>
        <Button
          type="button"
          component="button"
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
  );
}
export default ProductForm;
