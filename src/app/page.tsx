import { Card, CardList } from "@/components/cardList";
import { Headline } from "@/components/text";
import CmsService from "@/features/cms/cmsService";
import { LatestProjects } from "@/features/projects/latestProjects";
import { GenMetadata, PageProps } from "@/types";

export const generateMetadata: GenMetadata = () => {
  return {
    title: "ECB budget Tracker",
    description: "ECB budget Tracker description",
  };
};

/**
 * Landing / Home page
 * @returns
 */
export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const cards = await CmsService.getLatestArticlesCards();

  return (
    <main>
      <Headline className="center m-t-48 m-b-24">Budget Tracker</Headline>
      <LatestProjects />

      <div className="grid">
        <Headline level={2} className="center m-b-24">
          Latest articles
        </Headline>
        <CardList>
          {cards.map(({ key, ...rest }) => (
            <Card key={key} {...rest} />
          ))}
        </CardList>
      </div>
    </main>
  );
}
