import { Select } from "@/components/input/select";
import Message from "@/components/message/message";
import { Headline, Text } from "@/components/text";
import { Expense, Project } from "@/features/projects/types";
import { inputHandler } from "@/utils/inputHandlers";
import { FilterList } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import styles from "./expenseList.module.css";
import ExpenseTable from "./expenseTable";
import { getBudgetOptions, getTagOptions } from "./helpers";

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
  const { expenses, budget } = project;
  const { budgets } = budget;

  const [nameFilter, setNameFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [upToDate, setUpToDate] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [tagId, setTagId] = useState("");
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

    if (tagId) {
      results = results.filter(({ tags }) =>
        tags.some(({ id }) => id === tagId)
      );
    }

    if (budgetId) {
      results = results.filter(({ budgetId: bid }) => bid === budgetId);
    }

    setFilteredExpenses(results);
    // filter expenses when filters change
  }, [expenses, nameFilter, fromDate, upToDate, tagId, budgetId]);

  const tagOptions = useMemo(() => getTagOptions(expenses), [expenses]);
  const budgetOptions = useMemo(() => getBudgetOptions(budgets), [budgets]);

  const filteredExpensesAmount = useMemo(() => {
    return filteredExpenses.reduce((acc, { amount }) => {
      return acc + amount;
    }, 0);
  }, [filteredExpenses]);

  return (
    <div className={styles.expenseList}>
      <div className="m-24 m-t-48">
        <Text size={1}>
          <FilterList /> Filter results
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
          <Text Tag="label">
            Tags
            <Select
              value={tagId}
              options={tagOptions}
              onChange={inputHandler(setTagId)}
            />
          </Text>
          <Text Tag="label">
            Budget
            <Select
              value={budgetId}
              options={budgetOptions}
              onChange={inputHandler(setBudgetId)}
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
      </div>

      {filteredExpenses.length > 0 && (
        <ExpenseTable
          pid={project.id}
          onChange={onChange}
          budgets={project.budget.budgets}
          expenses={filteredExpenses}
        />
      )}

      <Headline className="m-24" level={5}>
        Expenses amount: {filteredExpensesAmount}
      </Headline>
    </div>
  );
};

export default ExpenseList;
