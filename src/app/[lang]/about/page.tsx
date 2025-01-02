"server only";

import AuthorCard from "@/components/authorCard/authorCard";
import { Card } from "@/components/cardList";
import { Link } from "@/components/link";
import { Headline, Text } from "@/components/text";
import CmsService from "@/features/cms/cmsService";
import { mapArticleToCardProps } from "@/features/contentful/articleService";
import { GenMetadata, PageProps } from "@/types";
import cx from "classnames";
import { getDictionary } from "../dictionaries";
import styles from "./page.module.css";

export const generateMetadata: GenMetadata = async ({ params }) => {
  const lang = (await params).lang;
  const dict = await getDictionary(lang); // en

  return {
    title: dict.about.title,
    description: dict.about.description,
  };
};

const AboutPage: React.FC<PageProps> = async ({ params }) => {
  const { lang } = await params;
  const { about } = await getDictionary(lang);
  const { key, ...card } = mapArticleToCardProps(
    await CmsService.getArticleByIdAndLocale("1GeUKpSLzKWoflIgm8Y0mT", lang)
  );

  return (
    <section className="grid mw-68 m-0a">
      <div className="m-24">
        <div className="m-48a">
          <Headline className="m-48a" level={1}>
            {about.title}
          </Headline>
          {card.author && (
            <div className="m-b-48">
              <AuthorCard author={card.author} />
            </div>
          )}
        </div>

        <div className="m-b-48">
          <Text Tag="p">{about.desc1}</Text>
          <Text Tag="p">{about.desc2}</Text>
          <Text Tag="p">{about.desc3}</Text>
          <Text Tag="p">{about.desc4}</Text>
          <Text Tag="p">
            {about.desc5}
            <Link href={about.desc5LinkHref}>{about.desc5LinkLabel}</Link>
          </Text>
          <Text Tag="p">{about.desc6}</Text>
        </div>
      </div>
      <div className={cx(styles.articles, "m-b-48")}>
        <Card key={key} {...card} />
      </div>
    </section>
  );
};

export default AboutPage;
