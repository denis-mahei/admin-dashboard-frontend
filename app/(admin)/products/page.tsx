import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/api/api.server";
import Box from "@mui/material/Box";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = typeof params.name === "string" ? params.name : "";
  const category = typeof params.category === "string" ? params.category : "";
  const currentPage = typeof params.page === "string" ? params.page : "1";
  const page = Number(currentPage);
  const limit = 5;
  const { data, totalProducts } = await getProducts({ name });
  console.log(data);
  console.log(totalProducts);
  return (
    <Box sx={{ py: "20px" }}>
      <ProductsTable products={data} />
    </Box>
  );
}

export default Page;
