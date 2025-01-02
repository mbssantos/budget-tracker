import { Link } from "@/components/link";
import { Headline } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import { Project } from "../../types";

const ProjectCard: React.FC<Project> = ({ id, title }) => {
  const locale = useLocale();
  return (
    <div>
      <Link href={`/${locale}/projects/${id}`}>
        <Headline level={3}>{title}</Headline>
      </Link>
    </div>
  );
};

export default ProjectCard;
