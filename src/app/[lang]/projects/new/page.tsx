import { NewProject } from "@/features/projects/project/newProject";
import { PageProps } from "@/types";

/**
 * Create project page
 * @returns
 */
export default function NewProjectPage({}: PageProps) {
  return (
    <main className="mw-full">
      <NewProject />
    </main>
  );
}
