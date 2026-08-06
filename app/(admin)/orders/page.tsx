import React from "react";
import { getOrders } from "@/lib/api/api.server";
import OrdersTable from "@/components/orders/orders-table";
import SearchForm from "@/components/orders/search-form";
import Pagination from "@/components/orders/pagination";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import Link from "@/components/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = typeof params.name === "string" ? params.name : "";
  const sortBy = typeof params.sortBy === "string" ? params.sortBy : "name";
  const currentPage = typeof params.page === "string" ? params.page : "1";
  const page = Number(currentPage);
  const limit = 5;
  const order = typeof params.order === "string" ? params.order : "asc";
  const { data, total } = await getOrders({
    name,
    sortBy,
    order,
    page,
    limit,
  });
  const totalPages = Math.ceil(total / limit);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box
      sx={{
        pt: { xs: "40px", sm: "50px", md: "75px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <SearchForm />
      <OrdersTable orders={data} />
      <Pagination perPages={pages} page={page} />
    </Box>
  );
}

export default Page;
