"use client";

import { Button } from "@/components/button";
import { CardList } from "@/components/cardList";
import { Link } from "@/components/link";
import { Headline, Text } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import { Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ProjectService from "../projectsService";
import { Project } from "../types";
import styles from "./latestProjects.module.css";
import ProjectCard from "./projectCard/projectCard";

const LatestProjects = () => {
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(ProjectService.getLatest(8));
  }, []);

  return (
    <section className={styles.myProjectsWrapper}>
      <div className={styles.myProjects}>
        <Headline level={2}>My Latest Projects</Headline>

        <div className="m-t-24">
          {projects.length === 0 && (
            <Text>
              <Warning />
              No projects found. Click the button below to get started.
            </Text>
          )}

          <CardList>
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </CardList>

          <div className="center m-t-24">
            <Link href={`/${locale}/projects/new`}>
              <Button level={1}>Create project</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;