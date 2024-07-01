import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  created_at: string;
}

interface transactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as transactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: { q: query },
    })

    setTransaction(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
