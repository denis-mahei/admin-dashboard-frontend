import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/api/api.server";
import Box from "@mui/material/Box";
import { getSearchParams } from "@/lib/utils/search-params";
import { getNumberParams } from "@/lib/utils/number-params";
import SearchForm from "@/components/orders/search-form";
import Pagination from "@/components/orders/pagination";
import React from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = getSearchParams(params.name);
  const category = getSearchParams(params.category);
  const page = getNumberParams(params.page, 1);
  const limit = 5;
  const { data, totalProducts } = await getProducts({
    name,
    category,
    page,
    limit,
  });
  const totalPages = Math.ceil(totalProducts / limit);
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);
  return (
    <Box
      sx={{
        pt: { xs: "40px", sm: "50px", md: "75px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchForm label={"Product Name"} />
      </Box>
      <ProductsTable products={data} />
      <Pagination perPages={pages} page={page} />
    </Box>
  );
}

export default Page;
