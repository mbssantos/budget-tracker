"use client";

import { Spinner } from "@/components/spinner";
import { Headline } from "@/components/text";
import { useCallback, useEffect, useState } from "react";
import ProjectService from "../projectsService";
import { Project as ProjectType } from "../types";
import { Admin } from "./admin";
import { Budget } from "./budget";
import Expenses from "./expenses/expenses";
import { Overview } from "./overview";

type ProjectProps = {
  id: string;
};

const Project: React.FC<ProjectProps> = ({ id }) => {
  const [project, setProject] = useState<ProjectType | undefined>();
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchProject = useCallback(() => {
    setProject(ProjectService.getById(id));
  }, [id, setProject]);

  useEffect(() => {
    fetchProject();
    setIsLoaded(true);
  }, [fetchProject]);

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

      <Overview project={project} />
      <Expenses project={project} onChange={fetchProject} />
      <Budget project={project} onChange={fetchProject} />
      <Admin project={project} />
    </section>
  );
};

export default Project;
