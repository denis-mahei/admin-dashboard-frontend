import { getProducts, getSuppliers } from "@/lib/api/api.server";
import { getNumberParams } from "@/lib/utils/number-params";
import { getSearchParams } from "@/lib/utils/search-params";
import ProductsTable from "@/components/products/products-table";
import Box from "@mui/material/Box";
import SearchForm from "@/components/orders/search-form";
import Pagination from "@/components/orders/pagination";
import AddProductTrigger from "@/components/products/add-product-trigger";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = getSearchParams(params.name);
  const category = getSearchParams(params.category);
  const page = getNumberParams(params.page, 1);
  const limit = 5;
  const [{ data, totalProducts }, suppliers] = await Promise.all([
    getProducts({
      name,
      category,
      page,
      limit,
    }),
    getSuppliers(),
  ]);
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
        <AddProductTrigger suppliers={suppliers} />
      </Box>
      <ProductsTable products={data} suppliers={suppliers} />
      <Pagination perPages={pages} page={page} />
    </Box>
  );
}

export default Page;
