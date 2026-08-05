import React from "react";
import { getOrders } from "@/lib/api/api.server";
import OrdersTable from "@/components/orders/orders-table";
import SearchForm from "@/components/orders/search-form";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = typeof params.name === "string" ? params.name : "";
  const { data, total } = await getOrders({ search });
  console.log(search);
  return (
    <>
      <SearchForm />
      <OrdersTable orders={data} />
    </>
  );
}

export default Page;
