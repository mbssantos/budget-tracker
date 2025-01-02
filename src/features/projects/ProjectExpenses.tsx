import { Headline } from "@/components/text";
import { ChangeEventHandler } from "react";
import ProjectQuarter from "./projectQuarter";
import { Project } from "./types";

type ProjectExpensesProps = {
  project: Project;
  onChange: () => void;
};

const ProjectExpenses: React.FC<ProjectExpensesProps> = ({
  project,
  onChange,
}) => {
  const { id, quarters } = project;

  const handleExpensesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // ProjectService.upsert(id, { expenses: {} });
    onChange();
  };

  return (
    <div>
      <Headline level={2} className="m-24">
        Revenue and Expenses
      </Headline>

      {quarters.map((quarter, index) => (
        <ProjectQuarter
          key={`${id}-${index}`}
          index={index + 1}
          quarter={quarter}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default ProjectExpenses;
