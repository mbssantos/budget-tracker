import { Headline } from "@/components/text";
import { Project } from "../../types";
import styles from "./overview.module.css";

type OverviewProps = {
  project: Project;
  onChange: () => void;
};

const Overview: React.FC<OverviewProps> = ({ project, onChange }) => {
  return (
    <div className={styles.overview}>
      <div className="mw-full">
        <div className="m-24">
          <Headline className="m-b-24" level={2}>
            Overview
          </Headline>
        </div>
      </div>
    </div>
  );
};

export default Overview;
