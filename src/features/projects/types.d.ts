export type ExpenseSource = "Thing";

export type Expense = {
  source: ExpenseSource;
  amount: number;
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
  createdAt: number;

  quarters: [Quarter, Quarter, Quarter, Quarter];
};

export type CreateProject = Pick<Project, "title" | "budget">;
