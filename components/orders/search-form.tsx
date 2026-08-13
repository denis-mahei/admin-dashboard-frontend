"use client";

import * as React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchFormProps = {
  label: string;
};

type FormValues = {
  name: string;
};

function SearchForm({ label }: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      name: searchParams.get("name") ?? "",
    },
  });
  const nameVal = watch("name");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const timer = setTimeout(() => {
      params.set("name", nameVal);
      params.delete("page");
      if (!nameVal) params.delete("name");
      router.replace(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [nameVal]);

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          sx={{
            maxWidth: "224px",
          }}
        />
      )}
    />
  );
}
export default SearchForm;
