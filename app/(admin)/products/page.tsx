import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/api/api.server";
import Box from "@mui/material/Box";
import { getSearchParams } from "@/lib/utils/search-params";
import { getNumberParams } from "@/lib/utils/number-params";

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
  console.log(data, totalPages);
  return (
    <Box sx={{ py: "20px" }}>
      <ProductsTable products={data} />
    </Box>
  );
}

export default Page;
