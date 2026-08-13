export interface Customer {
  id: number;
  photo: string;
  name: string;
  email: string;
  spent: number;
  phone: string;
  address: string;
  register_date: Date;
}

export interface IncomeExpenses {
  id: number;
  name: string;
  amount: number;
  type: "Error" | "Income" | "Expense";
}

export interface Order {
  id: number;
  photo: string;
  name: string;
  address: string;
  products: number;
  price: number;
  status: "Confirmed" | "Completed" | "Pending" | "Shipped" | "Processing";
  order_date: Date;
}

export const STATUS = ["Active", "Deactive"] as const;
export type Status = (typeof STATUS)[number];

export interface Supplier {
  id: number;
  name: string;
  address: string;
  company: string;
  date: Date;
  amount: number;
  status: Status;
}

export interface SupplierRequest {
  name: string;
  address: string;
  company: string;
  date: Date;
  amount: number;
  status: Status;
}

export const Categories = ["Hand", "Medicine", "Leg", "Heart", "Head"] as const;
export type Category = (typeof Categories)[number];

export interface Product {
  id: number;
  photo: string;
  name: string;
  stock: number;
  price: number;
  supplier: Supplier;
  category: Category;
}

export interface ProductRequest {
  name: string;
  stock: number;
  price: number;
  supplierId: number;
  category: Category;
  photo?: string;
}
