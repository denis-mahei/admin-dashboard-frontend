import React from "react";
import { getSearchParams } from "@/lib/utils/search-params";
import { getSuppliers } from "@/lib/api/api.server";
import { getNumberParams } from "@/lib/utils/number-params";
import Box from "@mui/material/Box";
import SearchForm from "@/components/orders/search-form";
import Pagination from "@/components/orders/pagination";
import SuppliersTable from "@/components/suppliers/suppliers-table";
import AddSupplierTrigger from "@/components/suppliers/add-supplier-trigger";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = getSearchParams(params.name);
  const page = getNumberParams(params.page, 1);
  const limit = 5;
  const { suppliers, total } = await getSuppliers({
    name,
    page,
    limit,
  });
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }).map((_, i) => i);
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
        <SearchForm label={"Supplier Name"} />
        <AddSupplierTrigger suppliers={suppliers} />
      </Box>
      <SuppliersTable suppliers={suppliers} />
      <Pagination perPages={pages} page={page} />
    </Box>
  );
}

export default Page;
