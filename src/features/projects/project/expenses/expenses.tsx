import { Headline } from "@/components/text";
import { Project } from "../../types";
import { ExpenseList } from "./expenseList";
import styles from "./expenses.module.css";
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
    <div className={styles.expenses}>
      <Headline level={2}>Expenses</Headline>
      <ExpenseList project={project} onChange={onChange} />
      <NewExpenseForm pid={project.id} onChange={onChange} />
    </div>
  );
};

export default Expenses;
