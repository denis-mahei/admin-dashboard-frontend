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
