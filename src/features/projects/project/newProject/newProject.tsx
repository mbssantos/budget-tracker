"use client";

import { Button } from "@/components/button";
import AddBudgetForm from "@/components/form/budgetForm";
import { Headline, Text } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import { inputHandler } from "@/utils/inputHandlers";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ProjectService from "../../projectsService";
import { Budget } from "../../types";
import BudgetsTable from "../budget/budgetsTable";

/**
 * Create project
 * @returns
 */
export const NewProject = ({}) => {
  const locale = useLocale();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const totalBudget = useMemo(
    () => budgets.reduce((acc, { amount }) => acc + amount, 0),
    [budgets]
  );

  const handleCreateProject = useCallback(() => {
    const [{ id }] = ProjectService.create({
      title: title.trim(),
      budgets,
    });
    router.push(`/${locale}/projects/${id}`);
  }, [title, budgets, router]);

  const handleDeleteBudget = useCallback(
    (budgetId: string) => {
      const index = budgets.findIndex(({ id }) => budgetId === id);
      if (index < 0) {
        // TODO: show UI message
        throw new Error("Tried to remove non-existent entry");
      }

      // shallow copy array
      const shallow = [...budgets];

      // remove by index
      shallow.splice(index, 1);

      // update UI
      setBudgets(shallow);
    },
    [budgets, setBudgets]
  );

  const handleAddBudget = useCallback(
    (budgetSource: Budget) => {
      // assume form validation catches all user errors
      setBudgets([...budgets, budgetSource]);
    },
    [budgets, setBudgets]
  );

  return (
    <div className="m-24">
      <Headline className="center m-t-48 m-b-24">Create new project</Headline>

      <Text Tag="label">
        <Headline level={4} className="m-t-24 m-b-24">
          Project Name
        </Headline>
        <input
          required
          type="text"
          onChange={inputHandler(setTitle)}
          value={title}
        />
      </Text>

      <Headline level={4} className="m-b-24">
        Budgets
      </Headline>

      <BudgetsTable budgets={budgets} onDelete={handleDeleteBudget} />

      <Headline level={4} className="m-t-24 m-b-24">
        Total project budget: {totalBudget}
      </Headline>

      <AddBudgetForm onAdd={handleAddBudget} />

      <Button onClick={handleCreateProject}>Crate project</Button>
    </div>
  );
};

export default NewProject;
