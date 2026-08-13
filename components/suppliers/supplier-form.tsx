"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { STATUS } from "@/lib/types/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SupplierPayload,
  supplierSchema,
  SupplierValues,
} from "@/lib/schemas/supplierSchema";
import { slotProps } from "@/components/products/product-form";
import { DatePicker } from "@mui/x-date-pickers";

type SupplierFormProps = {
  onSubmit: (data: SupplierPayload) => void;
  isEditing?: boolean;
  onClose?: () => void;
  defaultValues: SupplierValues;
};

function SupplierForm({
  onClose,
  onSubmit,
  isEditing,
  defaultValues,
}: SupplierFormProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(supplierSchema),
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
              label="Supplier Info"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                borderRadius: "60px",
              }}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Address"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="company"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Company"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Delivery date"
              format="MMMM D, YYYY"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              slotProps={slotProps}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                error={!!fieldState.error}
                labelId="select-label"
                id="select"
                value={field.value}
                onChange={field.onChange}
                label="Status"
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
                {STATUS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {fieldState.error?.message ?? " "}
              </FormHelperText>
            </FormControl>
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
          {isEditing ? "Save" : "Add"}
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
export default SupplierForm;
