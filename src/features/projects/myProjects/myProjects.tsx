"use client";

import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Headline, Text } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import { Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ProjectService from "../projectsService";
import { Project } from "../types";
import ProjectCard from "./projectCard/projectCard";

const MyProjects = () => {
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(ProjectService.getAllAsArray());
  }, []);

  return (
    <section>
      <Headline className="center" level={2}>
        My Projects
      </Headline>

      <div className="center m-t-24">
        {projects.length === 0 && (
          <Text>
            <Warning />
            No projects found. Click the button below to get started.
          </Text>
        )}

        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}

        <div className="center m-t-24">
          <Link href={`/${locale}/projects/new`}>
            <Button level={1}>Create project</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MyProjects;
