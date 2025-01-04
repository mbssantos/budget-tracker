import { generateId } from "@/utils/generateId";
import { LocalStorageService } from "@/utils/localStorageService";
import { Budget, CreateProject, Expense, Project } from "./types";

const LOCAL_STORAGE_KEY = "my-projects";

const lss = new LocalStorageService<Project>(LOCAL_STORAGE_KEY);

/**
 * Calculates the total budget a project has
 *
 * @param budget an array of objects with an amount
 * @returns
 */
const calcTotalBudget = (budget: Pick<Budget, "amount">[]) => {
  return budget.reduce((acc, source) => {
    return acc + source.amount;
  }, 0);
};

/**
 * Calculates the remaining budget a project has
 *
 * @param project
 * @returns
 */
const calcRemainingBudget = (project: Project) => {
  const { budget, expenses } = project;

  return expenses.reduce((acc, expense) => {
    return acc - expense.amount;
  }, budget.total);
};

/**
 * Project specific wrapper around storage.
 *
 * Handles specific logic related to projects like setting defaults and handling updates
 */
const ProjectService = {
  /**
   * Update a projects budget
   *
   * @param param0 either the pid or the project obj must be sent
   */
  refreshBudget({
    pid = "",
    project: proj,
  }: {
    pid?: string;
    project?: Project;
  }) {
    // get latest data from storage or use user param
    const project = proj || lss.getById(pid, true);

    // cache remaining for quick access
    project.budget.total = calcTotalBudget(project.budget.budgets);
    project.budget.remainingBudget = calcRemainingBudget(project);

    // save project changes
    ProjectService.upsert(project.id, project);
  },

  /**
   * Remove a budget
   *
   * @param pid Project Id
   * @param bid budget Id
   */
  removeBudget(pid: string, bid: string) {
    // get latest data from storage
    let project = lss.getById(pid, true);

    const budgets = [...project.budget.budgets];
    // create shallow copy
    const index = budgets.findIndex(({ id }) => bid === id);

    if (index < 0) {
      console.warn("index not found");

      // skip if budget is gone already, i.e. removed in another tab
      return;
    }

    // remove from array
    budgets.splice(index, 1);

    // reassign to shallow copy to keep it a pure function
    project = { ...project, budget: { ...project.budget, budgets } };

    // request budget update
    ProjectService.refreshBudget({ project });
  },

  /**
   * Adds a project budget
   *
   * @param pid Project Id
   * @param budget the new budget
   */
  addBudget(pid: string, budget: Budget) {
    // get latest data from storage
    let project = lss.getById(pid, true);

    // create shallow copy and push new budget
    const budgets = [...project.budget.budgets, budget];

    // reassign to shallow copy to keep it a pure function
    project = { ...project, budget: { ...project.budget, budgets } };

    console.log("adding", project.budget.budgets);

    // request budget update
    ProjectService.refreshBudget({ project });
  },

  /**
   *
   * @param pid project ID
   * @param expense the expense to add
   */
  addExpense(pid: string, expense: Omit<Expense, "id">) {
    // get latest data from storage
    const project = lss.getById(pid);

    if (!project) {
      // todo: handle error in the UI
      throw new Error(`Project with id ${pid} not found`);
    }

    // add expense to project
    project.expenses.push({
      id: generateId(),
      ...expense,
    });

    // sort expenses by due date
    project.expenses = project.expenses.sort((a, b) => a.dueDate - b.dueDate);

    // request budget update
    ProjectService.refreshBudget({ project });
  },

  /**
   * update an existing expense
   *
   * @param pid Project Id
   * @param expense the new expense
   */
  updateExpense(pid: string, expense: Expense) {
    // get latest data from storage
    const project = lss.getById(pid);

    if (!project) {
      // todo: handle error in the UI
      throw new Error(`Project with id ${pid} not found`);
    }

    const { id: eid } = expense;
    const expenseIndex = project.expenses.findIndex(({ id }) => eid === id);

    if (expenseIndex >= 0) {
      // update item
      project.expenses[expenseIndex] = expense;
    }

    // request budget update
    ProjectService.refreshBudget({ project });
  },

  /**
   * Remove an expense from the project
   *
   * @param pid Project Id
   * @param eid Expense Id
   */
  removeExpense(pid: string, eid: string) {
    // get latest data from storage
    const project = lss.getById(pid);

    if (!project) {
      // todo: handle error in the UI
      throw new Error(`Project with id ${pid} not found`);
    }

    const expenseIndex = project.expenses.findIndex(({ id }) => eid === id);
    if (expenseIndex >= 0) {
      // remove from array
      project.expenses.splice(expenseIndex, 1);
    }

    // cache remaining budget for quick access later
    project.budget.remainingBudget = calcRemainingBudget(project);

    // request budget update
    ProjectService.refreshBudget({ project });
  },

  upsert(id: string, delta: Partial<Project>) {
    return lss.upsert(id, delta);
  },

  create({ budgets, title }: CreateProject) {
    const totalBudget = calcTotalBudget(budgets);

    return lss.create({
      title,
      budget: {
        total: totalBudget,
        remainingBudget: totalBudget,
        budgets: budgets,
      },
      expenses: [],
    });
  },

  getAllAsArray() {
    return lss.getAllAsArray();
  },

  /**
   * Mocks an API call to fetch the latest projects
   *
   * @returns
   */
  getLatest(count = 5) {
    const allProjects = lss.getAllAsArray();
    return allProjects
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, count);
  },

  getById(id: string) {
    return lss.getById(id);
  },
};

export default ProjectService;
