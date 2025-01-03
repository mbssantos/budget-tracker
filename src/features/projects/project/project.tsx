"use client";

import { Spinner } from "@/components/spinner";
import { Headline } from "@/components/text";
import { useEffect, useState } from "react";
import ProjectService from "../projectsService";
import { Project as ProjectType } from "../types";
import Expenses from "./expenses/expenses";
import { Overview } from "./overview";

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
        {project.title}
      </Headline>

      <Overview project={project} onChange={fetchProject} />

      <div className="mw-full">
        <div className="m-16">
          <div className="m-0a">
            <Expenses project={project} onChange={fetchProject} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
