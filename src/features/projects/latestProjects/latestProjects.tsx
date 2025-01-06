"use client";

import { Button } from "@/components/button";
import { CardList } from "@/components/cardList";
import { Link } from "@/components/link";
import Message from "@/components/message/message";
import { Headline, Text } from "@/components/text";
import { useEffect, useState } from "react";
import ProjectCard from "../../../components/projectCard/projectCard";
import ProjectService from "../projectsService";
import { Project } from "../types";
import styles from "./latestProjects.module.css";

const LatestProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(ProjectService.getLatest(8));
  }, []);

  return (
    <section className={styles.myProjectsWrapper}>
      <div className={styles.myProjects}>
        <div className="m-16">
          <Headline className="center" level={2}>
            My Latest Projects
          </Headline>

          {projects.length === 0 && (
            <div className="center">
              <div className={styles.messageWrapper}>
                <Message>
                  <Text>
                    No projects found. Click the button below to get started.
                  </Text>
                </Message>
              </div>
            </div>
          )}

          <CardList>
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </CardList>

          <div className="center m-t-24">
            <Link href={`/projects/new`}>
              <Button level={1}>Create project</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;
