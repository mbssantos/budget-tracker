import { CardProps } from "@/components/cardList/card";
import { Locale } from "@/types";
import { enArticleMocks, ptArticleMocks } from "./articleMock";

const CmsService = {
  /**
   * Fetch article cards from CMS based on locale
   *
   * @param locale
   * @returns CardProps for CardArticle component
   */
  async getLatestArticlesCards(locale: Locale) {
    return new Promise<CardProps[]>((resolve) => {
      resolve(locale === "en" ? enArticleMocks : ptArticleMocks);
    });
  },
};

export default CmsService;
