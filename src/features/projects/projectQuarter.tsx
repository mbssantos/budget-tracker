import { Headline } from "@/components/text";
import { Quarter } from "./types";

type ProjectQuarterProps = {
  quarter: Quarter;
  index: number;
  onChange: () => void;
};

const ProjectQuarter: React.FC<ProjectQuarterProps> = ({
  index,
  quarter,
  onChange,
}) => {
  return (
    <div>
      <Headline level={3} className="m-24">
        Q{index}
      </Headline>
      <Headline level={4} className="m-24">
        Revenue
      </Headline>
      {quarter.revenues.map((rev) => (
        <div>{rev}</div>
      ))}
      <Headline level={4} className="m-24">
        Expenses
      </Headline>
    </div>
  );
};

export default ProjectQuarter;
