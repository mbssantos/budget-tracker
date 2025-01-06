"use client";

import { Button } from "@/components/button";
import AddBudgetForm from "@/components/form/addBudgetForm";
import { Headline, Text } from "@/components/text";
import { generateId } from "@/utils/generateId";
import { inputHandler } from "@/utils/inputHandlers";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useMemo, useState } from "react";
import ProjectService from "../../projectsService";
import { Budget, Project } from "../../types";
import BudgetsTable from "../budget/budgetsTable";

const getMockProject = (): Project => {
  return {
    id: generateId(),
    title: "",
    expenses: [],
    createdAt: Date.now(),
    budget: {
      total: 0,
      remainingBudget: 0,
      budgets: [],
    },
  };
};

/**
 * Create project
 * @returns
 */
export const NewProject = ({}) => {
  const router = useRouter();
  const [project, setProject] = useState(getMockProject());

  // deconstruct for easy access
  const { title, budget } = project;
  const { budgets } = project.budget;

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const [{ id }] = ProjectService.create({
      title: title.trim(),
      budgets,
    });
    router.push(`/projects/${id}`);
  };

  const setTitle = (title: string) => {
    setProject({ ...project, title });
  };

  const totalBudget = useMemo(
    () => budgets.reduce((acc, { amount }) => acc + amount, 0),
    [budgets]
  );

  const handleDeleteBudget = useCallback(
    (budgetId: string) => {
      const index = budgets.findIndex(({ id }) => budgetId === id);
      if (index < 0) {
        // TODO: show UI message
        throw new Error("Tried to remove non-existent entry");
      }

      // shallow copy array
      const newBudgets = [...budgets];

      // remove by index
      newBudgets.splice(index, 1);

      // update UI
      setProject({
        ...project,
        budget: { ...budget, budgets: newBudgets },
      });
    },
    [budget, project, budgets, setProject]
  );

  const handleAddBudget = useCallback(
    (budgetSource: Budget) => {
      // assume form validation catches all user errors
      setProject({
        ...project,
        budget: { ...budget, budgets: [...budgets, budgetSource] },
      });
    },
    [budget, project, budgets, setProject]
  );

  return (
    <div className="m-24">
      <form onSubmit={handleSubmitForm}>
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

        <BudgetsTable project={project} onDelete={handleDeleteBudget} />

        <Headline level={4} className="m-t-24 m-b-24">
          Total project budget: {totalBudget}
        </Headline>

        <div className="m-24">
          <Button level={1}>Create project</Button>
        </div>
      </form>

      <AddBudgetForm onAdd={handleAddBudget} />
    </div>
  );
};

export default NewProject;
