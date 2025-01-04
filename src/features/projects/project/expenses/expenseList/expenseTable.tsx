import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { Text } from "@/components/text";
import ProjectService from "@/features/projects/projectsService";
import { Budget, Expense } from "@/features/projects/types";
import { getColorFromString } from "@/utils/getColorFromString";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { DeleteForever } from "@mui/icons-material";
import { useCallback } from "react";
import styles from "./expenseTable.module.css";

type ExpenseTableProps = {
  /**
   * project id
   */
  pid: string;

  budgets: Budget[];

  expenses: Expense[];

  /**
   * Notify parent when something relevant happens
   */
  onChange: () => void;
};

const getBudgetLabel = (budgets: Budget[], bid: string) => {
  return budgets.find(({ id }) => id == bid)?.label || "Label not found";
};

const ExpenseTable: React.FC<ExpenseTableProps> = (props) => {
  const { pid, budgets, expenses, onChange } = props;

  const getBudgetLabelCb = useCallback(
    (bid: string) => getBudgetLabel(budgets, bid),
    [budgets]
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
            {expense.tags.map(({ id, label }) => (
              <Text
                key={id}
                className={styles.tag}
                style={{ backgroundColor: getColorFromString(id) }}
              >
                {label}
              </Text>
            ))}
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
