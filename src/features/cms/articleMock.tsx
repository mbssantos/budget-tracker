import { CardProps } from "@/components/cardList/card";

/**
 * Generate mock data from entry array
 * @returns
 */
const generateMock = ([headline, description, img]: string[], id: number) => {
  return {
    key: `${id}`,
    headline,
    description,
    href: "/",
    img: `/assets/images/article-mock/${img}.jpg`,
    author: {
      name: "Chat Gpt",
      avatar: "/assets/images/icons/chatGpt.svg",
      description: "Lorem ipsum",
      role: "Lead Writer",
    },
  } as CardProps;
};

const englishEntries = [
  [
    "The Art of Estimating Project Costs Accurately",
    "Enhance your cost estimation skills with proven methods to predict project expenses and minimize surprises.",
    "img1",
  ],
  [
    "Top Tools for Managing Project Budgets",
    "Explore our software solutions designed to streamline budget tracking and ensure financial control throughout your project lifecycle.",
    "img2",
  ],
  [
    "Do I need a Contingency Plan?",
    "Learn the importance of contingency planning and how to set aside funds for unexpected project expenses.",
    "img3",
  ],
];

export const articleMocks = englishEntries.map(generateMock);
