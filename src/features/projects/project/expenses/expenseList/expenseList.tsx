import Message from "@/components/message/message";
import { Text } from "@/components/text";
import { Expense, Project } from "@/features/projects/types";
import { inputHandler } from "@/utils/inputHandlers";
import { FilterList } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styles from "./expenseList.module.css";
import ExpenseTable from "./expenseTable";

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

const ExpenseList: React.FC<ExpenseListProps> = ({ project, onChange }) => {
  const { id: pid, expenses } = project;

  const [nameFilter, setNameFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [upToDate, setUpToDate] = useState("");

  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    let results = [...expenses];

    if (nameFilter) {
      const lowercaseFilter = nameFilter.toLocaleLowerCase();
      results = results.filter(({ name }) =>
        name.toLocaleLowerCase().includes(lowercaseFilter)
      );
    }

    if (fromDate) {
      const unixDate = new Date(fromDate).getTime();
      results = results.filter(({ dueDate }) => dueDate >= unixDate);
    }

    if (upToDate) {
      const unixDate = new Date(upToDate).getTime();
      results = results.filter(({ dueDate }) => dueDate <= unixDate);
    }

    setFilteredExpenses(results);
    // filter expenses when filters change
  }, [expenses, nameFilter, fromDate, upToDate]);

  return (
    <div className={styles.expenseList}>
      <Text size={1}>
        Filters results <FilterList />
      </Text>

      <div className={styles.filters}>
        <Text Tag="label">
          Name filter
          <input
            type="text"
            value={nameFilter}
            onChange={inputHandler(setNameFilter)}
          />
        </Text>
        <Text Tag="label">
          From date
          <input
            type="date"
            value={fromDate}
            onChange={inputHandler(setFromDate)}
          />
        </Text>
        <Text Tag="label">
          Up to
          <input
            type="date"
            value={upToDate}
            onChange={inputHandler(setUpToDate)}
          />
        </Text>
      </div>

      {expenses.length === 0 && (
        <Message>
          <Text>
            No expenses to display. Add new expenses using the form below.
          </Text>
        </Message>
      )}

      {expenses.length > 0 && filteredExpenses.length === 0 && (
        <Message>
          <Text>
            No expenses to display. Update your filters to see results
          </Text>
        </Message>
      )}

      {filteredExpenses.length > 0 && (
        <ExpenseTable
          expenses={filteredExpenses}
          onChange={onChange}
          pid={pid}
        />
      )}
    </div>
  );
};

export default ExpenseList;
