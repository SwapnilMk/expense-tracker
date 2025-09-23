export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type NewTransaction = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

export interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedTransactions {
  transactions: Transaction[];
  total: number;
  summary: Summary;
  pagination: {
    current: number;
    pages: number;
    limit: number;
  };
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  incomeCount: number;
  expenseCount: number;
}

export interface CategoryBreakdown {
    type: 'income' | 'expense';
    total: number;
    count: number;
    categories: {
        category: string;
        total: number;
        count: number;
        percentage: number;
    }[];
}
