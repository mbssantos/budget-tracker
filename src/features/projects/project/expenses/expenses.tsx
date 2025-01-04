import { Headline } from "@/components/text";
import { Project } from "../../types";
import { ExpenseList } from "./expenseList";
import { NewExpenseForm } from "./newExpenseForm";

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
  return (
    <>
      <div className="mw-full">
        <div className="m-24 m-t-48">
          <Headline level={2}>Expenses</Headline>
        </div>
        <ExpenseList project={project} onChange={onChange} />
      </div>
      <NewExpenseForm pid={project.id} onChange={onChange} />
    </>
  );
};

export default Expenses;
