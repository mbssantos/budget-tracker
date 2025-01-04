import AddExpenseForm from "@/components/form/addExpenseForm";
import { Headline } from "@/components/text";
import { useCallback } from "react";
import ProjectService from "../../projectsService";
import { Expense, Project } from "../../types";
import { ExpenseList } from "./expenseList";

type ProjectExpensesProps = {
  project: Project;
  onChange: () => void;
};

/**
 * Wrapper component around Expenses functionality
 *
 * @param param0
 * @returns
 */
const Expenses: React.FC<ProjectExpensesProps> = ({ project, onChange }) => {
  const handleAddExpense = useCallback(
    (expense: Expense) => {
      ProjectService.addExpense(project.id, expense);
      onChange();
    },
    [project.id, onChange]
  );

  return (
    <>
      <div className="mw-full">
        <div className="m-24 m-t-48">
          <Headline level={2}>Expenses</Headline>
        </div>
        <ExpenseList project={project} onChange={onChange} />
      </div>

      <AddExpenseForm onAdd={handleAddExpense} project={project} />
    </>
  );
};

export default Expenses;
