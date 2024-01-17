import { Category } from "./category";

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  createAt: Date;
  updateAt: Date;
  type: TransactionType;
  category?: Category;
}

export interface TransactionData {
  title: string;
  amount: number;
  type: TransactionType;
  category: number;
}

export type TransactionType = 'income' | 'expense';
