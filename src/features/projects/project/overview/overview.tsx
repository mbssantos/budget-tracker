import { Headline } from "@/components/text";
import { Project } from "../../types";
import Budget from "../budget";
import styles from "./overview.module.css";

type OverviewProps = {
  project: Project;
  onChange: () => void;
};

const Overview: React.FC<OverviewProps> = ({ project, onChange }) => {
  return (
    <div className={styles.overview}>
      <div className="mw-full">
        <div className="m-16">
          <Headline className="m-b-24" level={2}>
            Overview
          </Headline>
          <Budget project={project} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
