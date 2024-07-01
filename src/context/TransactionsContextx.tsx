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

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome"
}
interface transactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}



export const TransactionsContext = createContext({} as transactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: { 
        _sort: 'created_at',
        _order: "desc",
        q: query
       },
    })

    setTransaction(response.data);
  }

  async function createTransaction(data: CreateTransactionInput){
    const {description, price, category, type} = data

    const response = await api.post("transactions", {
      description,
      price,
      category,
      type,
      created_at: new Date()
    })
    setTransaction([...transactions, response.data]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
