import { Button } from "@/components/button";
import { Headline } from "@/components/text";
import { useRouter } from "next/navigation";
import ProjectService from "../../projectsService";
import { Project } from "../../types";

type AdminProps = {
  project: Project;
};

/**
 * Wrapper component around Expenses functionality
 *
 * @param param0
 * @returns
 */
const Admin: React.FC<AdminProps> = ({ project }) => {
  const router = useRouter();

  const handleDeleteProject = () => {
    ProjectService.delete(project.id);
    router.push("/");
  };

  return (
    <div className="mw-full">
      <div className="m-24">
        <Headline className="m-b-24" level={2}>
          Admin
        </Headline>
        <Button level={1} onClick={handleDeleteProject}>
          Delete project
        </Button>
      </div>
    </div>
  );
};

export default Admin;
