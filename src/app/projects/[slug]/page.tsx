import { Project } from "@/features/projects/project";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  return (
    <main>
      <Project id={decodeURIComponent(slug)} />
    </main>
  );
}
