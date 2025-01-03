import { Text } from "@/components/text";
import { ChangeEventHandler } from "react";
import ProjectService from "../projectsService";
import { Project } from "../types";

type ProjectBudgetProps = {
  project: Project;
  onChange: () => void;
};

const Budget: React.FC<ProjectBudgetProps> = ({ project, onChange }) => {
  const { id, budget } = project;

  const handleBudgetChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    ProjectService.upsert(id, { budget: +e.currentTarget.value });
    onChange();
  };

  return (
    <Text Tag="label">
      Starting budget
      <input
        min={0}
        required
        type="number"
        onChange={handleBudgetChange}
        value={budget}
      />
    </Text>
  );
};

export default Budget;
