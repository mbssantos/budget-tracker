import { Tag } from "../tags/types";

export type ExpenseSource = "Thing";

export type Expense = {
  id: string;

  /**
   * Keeping tags with the saved data allows for
   * faster reads but slower writes, which is my prefer approach
   * since data is read more often than it's changed.
   */
  tags: Tag[];
  name: string;
  dueDate: number;
  amount: number;
  isPayed: boolean;
  // Note: Adding a payment date would be nice
};

export type Budget = {
  id: string;
  tags: Tag[];
  label: string;
  amount: number;
};

export type Quarter = {
  revenues: number[];
  expenses: Expense[];
};

export type Project = {
  id: string;
  title: string;
  budget: {
    total: number;
    budgets: Budget[];
    remainingBudget: number;
  };
  createdAt: number;
  expenses: Expense[];
};

export type CreateProject = {
  title: string;
  budgets: Budget[];
};
