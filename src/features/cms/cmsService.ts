import { CardProps } from "@/components/cardList/card";
import { articleMocks } from "./articleMock";

const CmsService = {
  /**
   * Fetch article cards from mock CMS
   *
   * @param locale
   * @returns CardProps for CardArticle component
   */
  async getLatestArticlesCards() {
    return new Promise<CardProps[]>((resolve) => {
      resolve(articleMocks);
    });
  },
};

export default CmsService;
