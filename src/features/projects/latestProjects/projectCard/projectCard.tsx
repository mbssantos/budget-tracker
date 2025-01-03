import { Link } from "@/components/link";
import { Headline, Text } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import BusinessCenter from "@mui/icons-material/BusinessCenter";
import { Project } from "../../types";
import styles from "./projectCard.module.css";

const ProjectCard: React.FC<Project> = (project) => {
  const { id, title, remainingBudget, budget } = project;
  const locale = useLocale();

  const usedBudgetPercentage = Math.round(
    100 - (remainingBudget / Math.max(budget, 1)) * 100
  );

  // cap progress bar width
  const widthPercentage = Math.min(usedBudgetPercentage, 100);

  return (
    <div className={styles.projectCardWrapper}>
      <div className={styles.projectCard}>
        <Link href={`/${locale}/projects/${id}`}>
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
            <Text size={5}>{usedBudgetPercentage}% budget used</Text>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
