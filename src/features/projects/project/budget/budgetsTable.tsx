import { Button } from "@/components/button";
import { Message } from "@/components/message";
import { Table } from "@/components/table";
import Tag from "@/components/tag/tag";
import { Text } from "@/components/text";
import { DeleteForever } from "@mui/icons-material";
import { useMemo } from "react";
import { Project } from "../../types";

type BudgetsTableProps = {
  project: Project;
  onDelete: (id: string) => void;
};

export const BudgetsTable: React.FC<BudgetsTableProps> = ({
  project,
  onDelete,
}) => {
  const {
    budget: { budgets },
    expenses,
  } = project;

  const deletableBudgets = useMemo(() => {
    const budgetIdsInUse = expenses.map(({ budgetId }) => budgetId);
    return budgets
      .filter(({ id }) => !budgetIdsInUse.includes(id))
      .map(({ id }) => id);
  }, [budgets, expenses]);

  return (
    <>
      {budgets.length === 0 && (
        <Message>
          <Text>
            No budgets added. Use the form below to add a budget source
          </Text>
        </Message>
      )}

      {budgets.length > 0 && (
        <Table th={["Name", "Amount", "Tags", "Delete"]}>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>
                <Text>{budget.label}</Text>
              </td>
              <td>
                <Text>{budget.amount}</Text>
              </td>
              <td>
                {budget.tags.map((tag) => (
                  <Tag key={tag.id} tag={tag} />
                ))}
              </td>
              <td>
                <Button
                  onClick={onDelete.bind(null, budget.id)}
                  disabled={!deletableBudgets.includes(budget.id)}
                >
                  <Text size={2}>
                    <DeleteForever />
                  </Text>
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
};

export default BudgetsTable;
