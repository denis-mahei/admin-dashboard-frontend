import React from "react";
import Statistics from "@/components/dashboard/statistics";
import { getDashboardData } from "@/lib/api/api.server";
import SvgIcon from "@/components/svg-icon";
import StatisticsItem from "@/components/dashboard/statistics-item";
import RecentCustomers from "@/components/dashboard/recent-customers";
import Box from "@mui/material/Box";
import IncomeExpenses from "@/components/dashboard/income-expenses";

async function DashboardPage() {
  const {
    totalProducts,
    incomesExpenses,
    recentCustomers,
    totalCustomers,
    totalSuppliers,
  } = await getDashboardData();

  const items = [
    {
      title: "All Products",
      value: totalProducts,
      icon: <SvgIcon name={"data"} />,
    },
    {
      title: "All Suppliers",
      value: totalSuppliers,
      icon: <SvgIcon name={"people"} />,
    },
    {
      title: "All Customers",
      value: totalCustomers,
      icon: <SvgIcon name={"people"} />,
    },
  ];

  return (
    <>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { lg: "start" },
          gap: "20px",
          width: "100%",
        }}
      >
        <RecentCustomers recentCustomers={recentCustomers} />
        <IncomeExpenses expensesData={incomesExpenses} />
      </Box>
    </>
  );
}

export default DashboardPage;
