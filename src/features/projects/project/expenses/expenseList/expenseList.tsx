import Message from "@/components/message/message";
import { Text } from "@/components/text";
import { Project } from "@/features/projects/types";
import styles from "./expenseList.module.css";
export { default as ExpenseList } from "./expenseList";

type ExpenseListProps = {
  /**
   * Project
   */
  project: Project;

  /**
   * Notify parent when something relevant happens
   */
  onChange: () => void;
};

const ExpenseList: React.FC<ExpenseListProps> = ({ project }) => {
  const { expenses = [] } = project;

  return (
    <div className={styles.expenseList}>
      {expenses.length === 0 && (
        <Message>
          <Text>
            No expenses to display. Start by adding a new expense using the form
            below.
          </Text>
        </Message>
      )}

      {expenses.map((expense) => (
        <div key={expense.id}>
          <Text>{expense.name}</Text>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
