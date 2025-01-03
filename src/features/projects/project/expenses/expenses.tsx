import Message from "@/components/message/message";
import { Headline, Text } from "@/components/text";
import { ChangeEventHandler } from "react";
import { Project } from "../../types";
import styles from "./expenses.module.css";
import NewExpenseForm from "./newExpenseForm";

type ProjectExpensesProps = {
  project: Project;
  onChange: () => void;
};

const Expenses: React.FC<ProjectExpensesProps> = ({ project, onChange }) => {
  const { id, expenses = [] } = project;

  const handleExpensesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // ProjectService.upsert(id, { expenses: {} });
    onChange();
  };

  return (
    <div className={styles.expenses}>
      <Headline level={2}>Expenses</Headline>

      {expenses.length === 0 && (
        <Message>
          <Text>
            No expenses to display. Start by adding a new expense using the form
            below.
          </Text>
        </Message>
      )}

      {expenses?.map((expense, index) => (
        <div>expense</div>
      ))}

      <NewExpenseForm />
    </div>
  );
};

export default Expenses;
