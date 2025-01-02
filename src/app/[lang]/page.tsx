import { Card, CardList } from "@/components/cardList";
import { Headline } from "@/components/text";
import CmsService from "@/features/cms/cmsService";
import { MyProjects } from "@/features/projects/myProjects";
import { GenMetadata, PageProps } from "@/types";
import { getDictionary } from "./dictionaries";

export const generateMetadata: GenMetadata = async ({ params }) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang); // en

  return {
    title: dict.home.title,
    description: dict.home.description,
  };
};

/**
 * Landing / Home page
 * @returns
 */
export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const cards = await CmsService.getLatestArticlesCards(lang);

  return (
    <main>
      <Headline className="center m-t-48 m-b-24">
        {dict.global.budgetTracker}
      </Headline>
      <MyProjects />

      <div className="grid">
        <Headline level={2} className="center m-b-24">
          {dict.articles.title}
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
