import { Link } from "@/components/link";
import { Headline, Text } from "@/components/text";
import BusinessCenter from "@mui/icons-material/BusinessCenter";
import { Project } from "../../features/projects/types";
import styles from "./projectCard.module.css";

const getBudgetLabel = (remainingBudgetPercentage: number) => {
  if (remainingBudgetPercentage < 0) {
    return `${Math.abs(remainingBudgetPercentage)}% over budget`;
  }

  return `${remainingBudgetPercentage}% budget left`;
};

const ProjectCard: React.FC<Project> = (project) => {
  const { id, title, budget } = project;

  const remainingBudgetPercentage = Math.round(
    (budget.remainingBudget / Math.max(budget.total, 1)) * 100
  );

  const usedBudgetPercentage = 100 - remainingBudgetPercentage;

  // clamp progress bar width
  const widthPercentage = Math.min(usedBudgetPercentage, 100);

  return (
    <div className={styles.projectCardWrapper}>
      <div className={styles.projectCard}>
        <Link href={`/projects/${id}`}>
          <Headline level={3}>
            <div className={styles.icon}>
              <BusinessCenter />
            </div>
            {title}
          </Headline>
          <div className={styles.budget}>
            <div
              className={styles.budgetPercentage}
              style={{ width: `${widthPercentage}%` }}
            ></div>
            <Text size={5}>{getBudgetLabel(remainingBudgetPercentage)}</Text>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
