import React from "react";
import Statistics from "@/components/dashboard/statistics";
import { getCustomers, getProducts, getSuppliers } from "@/lib/api";
import SvgIcon from "@/components/svg-icon";
import StatisticsItem from "@/components/dashboard/statistics-item";

async function DashboardPage() {
  const { totalProducts } = await getProducts();
  const totalSuppliers = await getSuppliers();
  const totalCustomers = await getCustomers();
  const items = [
    {
      title: "All Products",
      value: totalProducts,
      icon: <SvgIcon name={"data"} />,
    },
    {
      title: "All Suppliers",
      value: totalSuppliers.length,
      icon: <SvgIcon name={"people"} />,
    },
    {
      title: "All Customers",
      value: totalCustomers.length,
      icon: <SvgIcon name={"people"} />,
    },
  ];
  return (
    <Statistics>
      {items.map((item) => (
        <StatisticsItem
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </Statistics>
  );
}

export default DashboardPage;
