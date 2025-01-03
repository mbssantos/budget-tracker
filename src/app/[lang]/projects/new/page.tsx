"use client";

import { Button } from "@/components/button";
import { Headline, Text } from "@/components/text";
import ProjectService from "@/features/projects/projectsService";
import useLocale from "@/hooks/useLocale";
import { PageProps } from "@/types";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

/**
 * Create project page
 * @returns
 */
export default function NewProjectPage({}: PageProps) {
  const locale = useLocale();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState(0);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleBudgetChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBudget(+e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const [{ id }] = ProjectService.create({ title: title.trim(), budget });
    router.push(`/${locale}/projects/${id}`);
  };

  return (
    <main className="mw-full">
      <div className="m-24">
        <Headline className="center m-t-48 m-b-24">Create new project</Headline>

        <form onSubmit={handleSubmit}>
          <Text Tag="label">
            Title
            <input
              required
              type="text"
              onChange={handleTitleChange}
              value={title}
            />
          </Text>

          <Text Tag="label">
            Initial budget
            <input
              min={0}
              required
              type="number"
              onChange={handleBudgetChange}
              value={budget}
            />
          </Text>

          <div className="center m-t-48">
            <Button level={1}>Create</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
