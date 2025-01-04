import { SelectOption } from "@/components/input/select/select";
import { Budget, Expense } from "@/features/projects/types";
import { Tag } from "@/features/tags/types";

/**
 * Transform an Expenses array into an Option array for a Select
 * to use
 *
 * @param expenses
 * @returns
 */
export const getTagOptions = (expenses: Expense[]) => {
  const uniqueTagIds: string[] = [];
  const uniqueTags = expenses.reduce((acc, expense) => {
    expense.tags.forEach((tag) => {
      if (!uniqueTagIds.includes(tag.id)) {
        acc.push(tag);
      }
    });

    return acc;
  }, [] as Tag[]);

  const options = uniqueTags.map((tag) => ({
    value: tag.id,
    label: tag.label,
  })) as SelectOption<string>[];

  // add empty option
  options.unshift({ label: "-", value: "" });

  return options;
};

/**
 * Transform a budget array into an Option array for a Select
 * to use
 *
 * @param budget
 * @returns
 */
export const getBudgetOptions = (budget: Budget[]) => {
  const options = budget.map(({ id: value, label }) => ({
    value,
    label,
  })) as SelectOption<string>[];

  // add empty option
  options.unshift({ label: "-", value: "" });

  return options;
};
