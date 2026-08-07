"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Link from "@/components/link";
import { usePathname } from "next/navigation";

type PaginationProps = {
  perPages: number[];
  page: number;
};

function Pagination({ perPages, page }: PaginationProps) {
  const pathname = usePathname();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      {perPages.map((_, i) => (
        <Button
          key={i}
          sx={{
            color: "primary.light",
            p: "2px",
            minWidth: 0,
          }}
          component={Link}
          href={`${pathname}?page=${i + 1}`}
        >
          <Box
            sx={{
              width: page === i + 1 ? 12 : 10,
              height: page === i + 1 ? 12 : 10,
              borderRadius: "50%",
              backgroundColor:
                page === i + 1 ? "primary.main" : "primary.light",
            }}
          />
        </Button>
      ))}
    </Box>
  );
}
export default Pagination;
