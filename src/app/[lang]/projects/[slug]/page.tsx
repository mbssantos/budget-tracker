import Project from "@/features/projects/project";
import { PageProps } from "@/types";

type ProjectPageProps = {
  slug: string;
};

export default async function ProjectPage({
  params,
}: PageProps<ProjectPageProps>) {
  const { slug } = await params;

  return (
    <main>
      <Project id={decodeURIComponent(slug)} />
    </main>
  );
}
