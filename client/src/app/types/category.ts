import { Transaction } from "./transaction";

export interface Category {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
}
