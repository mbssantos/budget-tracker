import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { Text } from "@/components/text";
import ProjectService from "@/features/projects/projectsService";
import { Budget, Project } from "@/features/projects/types";
import { getColorFromString } from "@/utils/getColorFromString";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { DeleteForever } from "@mui/icons-material";
import { useCallback } from "react";
import styles from "./expenseTable.module.css";

type ExpenseTableProps = {
  project: Project;

  /**
   * Notify parent when something relevant happens
   */
  onChange: () => void;
};

const getBudgetLabel = (budgets: Budget[], bid: string) => {
  return budgets.find(({ id }) => id == bid)?.label || "Label not found";
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({ project, onChange }) => {
  const { id: pid, expenses } = project;

  const getBudgetLabelCb = useCallback(
    getBudgetLabel.bind(null, project.budget.budgets),
    [project.budget.budgets]
  );

  const handleDeleteClick = (expenseId: string) => {
    ProjectService.removeExpense(pid, expenseId);
    onChange();
  };

  const handleIsPaidChange = (expenseId: string) => {
    const expense = expenses.find(({ id }) => expenseId === id);

    if (!expense) {
      throw new Error(`Failed to find expense with id ${expenseId}`);
    }

    ProjectService.updateExpense(pid, {
      ...expense,
      // toggle paid flag
      isPaid: !expense.isPaid,
    });

    onChange();
  };

  return (
    <Table
      th={["Name", "Amount", "Budget", "Due date", "is paid", "tags", "Delete"]}
    >
      {expenses.map((expense) => (
        <tr key={expense.id}>
          <td>
            <Text>{expense.name}</Text>
          </td>
          <td>
            <Text>{expense.amount}</Text>
          </td>
          <td>
            <Text>{getBudgetLabelCb(expense.budgetId)}</Text>
          </td>
          <td>
            <Text>{getFormattedDate(expense.dueDate)}</Text>
          </td>
          <td className="center">
            <Text size={2}>
              <input
                type="checkbox"
                checked={expense.isPaid}
                onChange={handleIsPaidChange.bind(null, expense.id)}
              />
            </Text>
          </td>
          <td>
            <Text>
              {expense.tags.map(({ id, label }) => (
                <Text
                  key={id}
                  className={styles.tag}
                  style={{ backgroundColor: getColorFromString(id) }}
                >
                  {label}
                </Text>
              ))}
            </Text>
          </td>
          <td>
            <Button onClick={handleDeleteClick.bind(null, expense.id)}>
              <Text size={2}>
                <DeleteForever />
              </Text>
            </Button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default ExpenseTable;
