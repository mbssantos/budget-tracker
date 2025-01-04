import Message from "@/components/message/message";
import { Text } from "@/components/text";
import { Expense } from "../../types";

type UpcomingExpensesProps = {
  expenses: Expense[];
};
/**
 * Arbitrary time to consider something due
 */
const dueTimeInDays = 15;
const dueTimestamp = Date.now() + dueTimeInDays * 24 * 60 * 60 * 1000;

/**
 * Handle text plurals for labels
 *
 * @param count
 * @returns
 */
const getLabel = (count: number) => {
  switch (count) {
    case 1:
      return `There is ${count} bill`;

    default:
      return `There are ${count} bills`;
  }
};

/**
 * List expenses due soon
 *
 * @param param0
 * @returns
 */
const UpcomingExpenses: React.FC<UpcomingExpensesProps> = ({ expenses }) => {
  const currentDate = Date.now();

  const overdue = expenses.filter(
    ({ isPaid, dueDate }) => !isPaid && dueDate < currentDate
  );

  const upcoming = expenses.filter(
    ({ isPaid, dueDate }) =>
      !isPaid && dueDate < dueTimestamp && dueDate > currentDate
  );

  const content = [];

  if (upcoming.length > 0) {
    // don't show anything when there are no bills due
    content.push(
      <Message key="upcoming-expenses">
        <Text>{getLabel(upcoming.length)} due soon.</Text>
      </Message>
    );
  }

  if (overdue.length > 0) {
    // don't show anything when there are no bills due
    content.push(
      <Message key="overdue-expenses">
        <Text>{getLabel(overdue.length)} overdue.</Text>
      </Message>
    );
  }

  return content;
};

export default UpcomingExpenses;
