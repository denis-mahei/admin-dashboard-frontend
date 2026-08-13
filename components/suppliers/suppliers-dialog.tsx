import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@/components/svg-icon";
import DialogContent from "@mui/material/DialogContent";
import { STATUS, Supplier } from "@/lib/types/definitions";
import SupplierForm from "@/components/suppliers/supplier-form";
import { useMutation } from "@tanstack/react-query";
import { SupplierPayload } from "@/lib/schemas/supplierSchema";
import { addNewSupplier, updateSupplier } from "@/lib/api/api.server";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

type SupplierDialogProps = {
  open: boolean;
  onClose: () => void;
  supplier?: Supplier;
};

function SuppliersDialog({ open, onClose, supplier }: SupplierDialogProps) {
  const router = useRouter();
  const isEditing = !!supplier;
  const defaultValues = supplier
    ? {
        name: supplier.name,
        address: supplier.address,
        company: supplier.company,
        date: dayjs(supplier.date),
        amount: Number(supplier.amount),
        status: supplier.status,
      }
    : {
        name: "",
        address: "",
        company: "",
        date: dayjs(),
        amount: 0,
        status: STATUS[0],
      };

  const mutation = useMutation({
    mutationFn: (payload: SupplierPayload) =>
      isEditing
        ? updateSupplier(supplier?.id, payload)
        : addNewSupplier(payload),
    onSuccess: () => {
      enqueueSnackbar(isEditing ? "Supplier updated." : "Supplier added.", {
        variant: "success",
      });
      onClose();
      router.refresh();
    },
    onError: () => {
      enqueueSnackbar(
        isEditing ? "Failed to update supplier." : "Failed to add supplier.",
        { variant: "error" },
      );
    },
  });

  return (
    <Dialog
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          sx: { borderRadius: "12px" },
        },
      }}
    >
      <Box sx={{ px: "20px", py: "40px" }}>
        <Typography
          component="h2"
          sx={{ fontSize: 24, fontWeight: "bold", mb: "40px" }}
        >
          {isEditing ? "Edit supplier" : "Add a new supplier"}
        </Typography>
        <IconButton
          component="button"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <SvgIcon name="close" width="24" height="24" />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <SupplierForm
            onSubmit={mutation.mutate}
            onClose={onClose}
            defaultValues={defaultValues}
            isEditing={isEditing}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
}
export default SuppliersDialog;
