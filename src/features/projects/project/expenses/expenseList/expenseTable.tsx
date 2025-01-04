import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { Text } from "@/components/text";
import ProjectService from "@/features/projects/projectsService";
import { Expense } from "@/features/projects/types";
import { getColorFromString } from "@/utils/getColorFromString";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { DeleteForever } from "@mui/icons-material";
import styles from "./expenseTable.module.css";

type ExpenseTableProps = {
  /**
   * Project id
   */
  pid: string;

  /**
   * Expenses id
   */
  expenses: Expense[];

  /**
   * Notify parent when something relevant happens
   */
  onChange: () => void;
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  pid,
  expenses,
  onChange,
}) => {
  const handleDeleteClick = (expenseId: string) => {
    ProjectService.removeExpense(pid, expenseId);
    onChange();
  };

  const handleIsPayedChange = (expenseId: string) => {
    const expense = expenses.find(({ id }) => expenseId === id);

    if (!expense) {
      throw new Error(`Failed to find expense with id ${expenseId}`);
    }

    ProjectService.updateExpense(pid, {
      ...expense,
      // toggle payed flag
      isPayed: !expense.isPayed,
    });

    onChange();
  };

  return (
    <Table th={["Name", "Amount", "Due date", "is payed", "tags", "Delete"]}>
      {expenses.map((expense) => (
        <tr key={expense.id}>
          <td>
            <Text>{expense.name}</Text>
          </td>
          <td>
            <Text>{expense.amount}</Text>
          </td>
          <td>
            <Text>{getFormattedDate(expense.dueDate)}</Text>
          </td>
          <td className="center">
            <Text size={2}>
              <input
                type="checkbox"
                checked={expense.isPayed}
                onChange={handleIsPayedChange.bind(null, expense.id)}
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
