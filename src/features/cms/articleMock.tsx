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

const portugueseEntries = [
  [
    "Dominando Orçamentos de Projetos: Um Guia Passo a Passo",
    "Aprenda a planejar, alocar e gerenciar recursos de forma eficaz para manter seu projeto no caminho certo e dentro do orçamento.",
    "img1",
  ],
  [
    "Erros Comuns em Orçamentos de Projetos e Como Evitá-los",
    "Descubra armadilhas frequentes no orçamento de projetos e dicas práticas para evitar gastos excessivos e má gestão de recursos.",
    "img2",
  ],
  [
    "A Arte de Estimar Custos de Projetos com Precisão",
    "Aprimore suas habilidades de estimativa de custos com métodos comprovados para prever despesas de projetos e minimizar surpresas.",
    "img3",
  ],
];

export const enArticleMocks = englishEntries.map(generateMock);
export const ptArticleMocks = portugueseEntries.map(generateMock);
