import AddBudgetForm from "@/components/form/budgetForm";
import { Headline } from "@/components/text";
import { useCallback } from "react";
import ProjectService from "../../projectsService";
import { Budget, Project } from "../../types";
import BudgetsTable from "../budget/budgetsTable";
import styles from "./overview.module.css";

type OverviewProps = {
  project: Project;
  onChange: () => void;
};

const Overview: React.FC<OverviewProps> = ({ project, onChange }) => {
  const handleDeleteBudget = useCallback(
    (budgetId: string) => {
      ProjectService.removeBudget(project.id, budgetId);
      onChange();
    },
    [project.id]
  );

  const handleAddBudget = useCallback(
    (budget: Budget) => {
      console.log("adding", budget);

      ProjectService.addBudget(project.id, budget);
      onChange();
    },
    [project.id]
  );

  return (
    <div className={styles.overview}>
      <div className="mw-full">
        <div className="m-24">
          <Headline className="m-b-24" level={2}>
            Overview
          </Headline>

          <Headline level={4} className="m-t-24 m-b-24">
            Budget
          </Headline>
        </div>
        <BudgetsTable
          budgets={project.budget.budgets}
          onDelete={handleDeleteBudget}
        />
        <div className="m-24">
          <Headline level={5} className="m-t-24 m-b-24">
            Total project budget: {project.budget.total}
          </Headline>
        </div>

        <AddBudgetForm onAdd={handleAddBudget} />
      </div>
    </div>
  );
};

export default Overview;
