"use client";

import { Spinner } from "@/components/spinner";
import { Headline } from "@/components/text";
import { useEffect, useState } from "react";
import ProjectBudget from "./projectBudget";
import ProjectExpenses from "./ProjectExpenses";
import ProjectService from "./projectsService";
import { Project as ProjectType } from "./types";

type ProjectProps = {
  id: string;
};

const Project: React.FC<ProjectProps> = ({ id }) => {
  const [project, setProject] = useState<ProjectType | undefined>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchProject();
    setIsLoaded(true);
  }, []);

  const fetchProject = () => {
    setProject(ProjectService.getById(id));
  };

  if (!project) {
    return (
      <section>
        <Headline className="center m-t-48 m-b-24" level={1}>
          {isLoaded ? "Project not found" : <Spinner />}
        </Headline>
      </section>
    );
  }

  return (
    <section>
      <Headline className="center m-t-48 m-b-24" level={2}>
        Project {project.title}
      </Headline>

      <div className="m-t-24">
        <div className="mw-68 m-0a">
          <ProjectBudget project={project} onChange={fetchProject} />
          <ProjectExpenses project={project} onChange={fetchProject} />
        </div>
      </div>
    </section>
  );
};

export default Project;
