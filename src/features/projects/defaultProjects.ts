import { Project } from "./types";

export const defaultProjects: Project[] = [
  {
    id: "MC41ODA4Nzg3NDA3MzQ3MzUx",
    createdAt: 1736231441154,
    title: "Virtual Lab",
    budget: {
      total: 50000,
      remainingBudget: 46300,
      budgets: [
        {
          id: "MC4zOTU5Nzc2NjE3MjYwNTg=",
          label: "Travel",
          tags: [
            {
              id: "dHJhdmVs",
              createdAt: 1736231302212,
              label: "travel",
            },
          ],
          amount: 5000,
        },
        {
          id: "MC44MzI0OTk4NjUzNTk5NDM0",
          label: "Consultancy",
          tags: [
            {
              id: "Y29uc3VsdGFuY3k=",
              createdAt: 1736231302212,
              label: "consultancy",
            },
          ],
          amount: 15000,
        },
        {
          id: "MC4zODIwNjY2OTQ0NTkwODQ5",
          label: "Licenses",
          tags: [
            {
              id: "bGljZW5zZXM=",
              createdAt: 1736231302212,
              label: "licenses",
            },
          ],
          amount: 15000,
        },
        {
          id: "MC40NjgzMzE5OTcxNTIzNDI3NQ==",
          label: "Supplies",
          tags: [
            {
              id: "U3VwcGxpZXM=",
              createdAt: 1736231421896,
              label: "Supplies",
            },
            {
              id: "R2VuZXJhbA==",
              createdAt: 1736231401193,
              label: "General",
            },
          ],
          amount: 15000,
        },
      ],
    },
    expenses: [
      {
        id: "MC42ODcxNzU4ODU1NDU3Njg0",
        name: "Trip to Luxemburg\t",
        tags: [
          {
            id: "dHJhdmVs",
            createdAt: 1736231302212,
            label: "travel",
          },
        ],
        amount: 750,
        budgetId: "MC4zOTU5Nzc2NjE3MjYwNTg=",
        isPaid: false,
        dueDate: 1736294400000,
      },
      {
        id: "MC41NjEyNjU2MTMwODYyMzk=",
        name: "Trip to Berlin",
        tags: [
          {
            id: "dHJhdmVs",
            createdAt: 1736231302212,
            label: "travel",
          },
        ],
        amount: 500,
        budgetId: "MC4zOTU5Nzc2NjE3MjYwNTg=",
        isPaid: false,
        dueDate: 1736467200000,
      },
      {
        id: "MC4xNDU4MDczNzEzNzk4NDI5",
        name: "Trip to Prague\t",
        tags: [
          {
            id: "dHJhdmVs",
            createdAt: 1736231302212,
            label: "travel",
          },
        ],
        amount: 250,
        budgetId: "MC4zOTU5Nzc2NjE3MjYwNTg=",
        isPaid: false,
        dueDate: 1736985600000,
      },
      {
        id: "MC4zODE3MjU3NzgzNDA5ODU3Ng==",
        name: "Trip to London",
        tags: [
          {
            id: "dHJhdmVs",
            createdAt: 1736231302212,
            label: "travel",
          },
        ],
        amount: 300,
        budgetId: "MC4zOTU5Nzc2NjE3MjYwNTg=",
        isPaid: false,
        dueDate: 1737849600000,
      },
      {
        id: "MC4zNjA3OTY0NjMwNzYyOTk4Nw==",
        name: "Windows",
        tags: [
          {
            id: "bGljZW5zZXM=",
            createdAt: 1736231302212,
            label: "licenses",
          },
        ],
        amount: 700,
        budgetId: "MC4zODIwNjY2OTQ0NTkwODQ5",
        isPaid: false,
        dueDate: 1740528000000,
      },
      {
        id: "MC4wNzg0MTE3MjU0ODk0MDU2Nw==",
        name: "Stationery",
        tags: [
          {
            id: "MC41NjE1OTgyMzI3NzkwODM2",
            createdAt: 1736231401193,
            label: "General",
          },
        ],
        amount: 500,
        budgetId: "MC40NjgzMzE5OTcxNTIzNDI3NQ==",
        isPaid: false,
        dueDate: 1744848000000,
      },
      {
        id: "MC43OTEzOTEwMTEwODk5NjI5",
        name: "Azure",
        tags: [
          {
            id: "bGljZW5zZXM=",
            createdAt: 1736231302212,
            label: "licenses",
          },
        ],
        amount: 1200,
        budgetId: "MC4zODIwNjY2OTQ0NTkwODQ5",
        isPaid: false,
        dueDate: 1749686400000,
      },
    ],
  },
];
