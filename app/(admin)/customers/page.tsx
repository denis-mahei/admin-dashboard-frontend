import { getCustomers } from "@/lib/api/api.server";
import { getSearchParams } from "@/lib/utils/search-params";
import { getNumberParams } from "@/lib/utils/number-params";
import Box from "@mui/material/Box";
import SearchForm from "@/components/orders/search-form";
import AddSupplierTrigger from "@/components/suppliers/add-supplier-trigger";
import SuppliersTable from "@/components/suppliers/suppliers-table";
import Pagination from "@/components/orders/pagination";
import React from "react";
import CustomersTable from "@/components/customers/customers-table";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = getSearchParams(params.name);
  const page = getNumberParams(params.page, 1);
  const limit = 5;
  const { customers, totalCustomers } = await getCustomers({
    name,
    page,
    limit,
  });
  const total = Math.ceil(totalCustomers / limit);
  const pages = Array.from({ length: total }).map((_, i) => i);
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
        <SearchForm label={"Customer Name"} />
      </Box>
      <CustomersTable customers={customers} />
      <Pagination perPages={pages} page={page} />
    </Box>
  );
}

export default Page;
