"use client";

import { Spinner } from "@/components/spinner";
import { Headline } from "@/components/text";
import { useEffect, useState } from "react";
import ProjectService from "../projectsService";
import { Project as ProjectType } from "../types";
import Budget from "./budget";
import Expenses from "./expenses/expenses";

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
    <section className="mw-full">
      <Headline className="center m-t-48 m-b-24" level={2}>
        {project.title}
      </Headline>

      <div className="m-16">
        <div className="m-0a">
          <Budget project={project} onChange={fetchProject} />
          <Expenses project={project} onChange={fetchProject} />
        </div>
      </div>
    </section>
  );
};

export default Project;
