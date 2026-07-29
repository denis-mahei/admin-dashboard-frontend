import { getProducts } from "@/lib/api";

export default async function Dashboard() {
  const dashboard = await getProducts();
  console.log(dashboard);
  return <h1></h1>;
}
