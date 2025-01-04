import AddBudgetForm from "@/components/form/budgetForm";
import { Headline } from "@/components/text";
import { useCallback } from "react";
import ProjectService from "../../projectsService";
import { Budget as BudgetType, Project } from "../../types";
import BudgetsTable from "./budgetsTable";

type BudgetProps = {
  project: Project;
  onChange: () => void;
};

const Budget: React.FC<BudgetProps> = ({ project, onChange }) => {
  const handleDeleteBudget = useCallback(
    (budgetId: string) => {
      ProjectService.removeBudget(project.id, budgetId);
      onChange();
    },
    [project.id]
  );

  const handleAddBudget = useCallback(
    (budget: BudgetType) => {
      ProjectService.addBudget(project.id, budget);
      onChange();
    },
    [project.id]
  );

  return (
    <>
      <div className="mw-full">
        <div className="m-24 m-t-48">
          <Headline level={2}>Budget</Headline>
        </div>
        <BudgetsTable project={project} onDelete={handleDeleteBudget} />
        <div className="m-24">
          <Headline level={5} className="m-t-24 m-b-24">
            Total project budget: {project.budget.total}
          </Headline>
        </div>
      </div>

      <AddBudgetForm onAdd={handleAddBudget} />
    </>
  );
};

export default Budget;
