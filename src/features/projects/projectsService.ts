import { encode } from "@/utils/base64";
import { LocalStorageService } from "@/utils/localStorageService";
import { CreateProject, Expense, Project } from "./types";

const LOCAL_STORAGE_KEY = "my-projects";

const lss = new LocalStorageService<Project>(LOCAL_STORAGE_KEY);

/**
 * Project specific wrapper around storage.
 *
 * Handles specific logic related to projects like setting defaults and handling updates
 */
const ProjectService = {
  /**
   * Calculates the remaining budget a project has
   *
   * @param project the project to calculate the budget for
   * @returns
   */
  getRemainingBudget(project: Project) {
    const { budget, expenses } = project;

    return expenses.reduce((acc, expense) => {
      return acc - expense.amount;
    }, budget);
  },

  addExpense(id: string, expense: Omit<Expense, "id">) {
    // get latest data from storage
    const project = lss.getById(id);

    if (!project) {
      // todo: handle error in the UI
      throw new Error(`Project with id ${id} not found`);
    }

    // add expense to project
    project.expenses.push({
      id: encode(`${Math.random()}`),
      ...expense,
    });

    // cache remaining for quick access
    project.remainingBudget = ProjectService.getRemainingBudget(project);

    // save project changes
    ProjectService.upsert(id, project);
  },

  upsert(id: string, delta: Partial<Project>) {
    return lss.upsert(id, delta);
  },

  create(data: CreateProject) {
    return lss.create({
      ...data,
      expenses: [],
      revenues: [],
      remainingBudget: data.budget,
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
