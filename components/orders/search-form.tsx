"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import SvgIcon from "@/components/svg-icon";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FormValues = {
  name: string;
};

function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });
  const handleSearch = (value: FormValues) => {
    const params = new URLSearchParams(searchParams);
    params.set("name", value.name);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="User Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            sx={{ maxWidth: "224px" }}
          />
        )}
      />
      <Button
        type="submit"
        variant={"contained"}
        sx={{
          ml: "14px",
          borderRadius: "60px",
          px: "30px",
          py: "13px",
          maxHeight: "44px",
        }}
      >
        <SvgIcon name={"filter"} width={"14"} height={"14"} />
        <Typography
          component="p"
          sx={{
            color: "white",
            textTransform: "capitalize",
            ml: 1,
            fontWeight: 500,
          }}
        >
          Filter
        </Typography>
      </Button>
    </form>
  );
}
export default SearchForm;
