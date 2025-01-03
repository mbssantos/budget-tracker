import { Tag } from "../tags/types";

export type ExpenseSource = "Thing";

export type Expense = {
  id: string;
  tags: Tag[];
  name: string;
  dueDate: number;
  amount: number;
  isPayed: boolean;
  // Note: Adding a payed date would probably make sense for tracking
};

export type Revenue = {
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
  budget: number;
  remainingBudget: number;
  createdAt: number;
  expenses: Expense[];
  revenues: Revenue[];
};

export type CreateProject = Pick<Project, "title" | "budget">;
