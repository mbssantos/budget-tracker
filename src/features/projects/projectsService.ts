import { LocalStorageService } from "@/utils/localStorageService";
import { CreateProject, Project } from "./types";

const LOCAL_STORAGE_KEY = "my-projects";

const lss = new LocalStorageService<Project>(LOCAL_STORAGE_KEY);

/**
 * Project specific wrapper around storage.
 *
 * Handles specific logic related to projects like setting defaults and handling updates
 */
const ProjectService = {
  upsert(id: string, delta: Partial<Project>) {
    return lss.upsert(id, delta);
  },

  create(data: CreateProject) {
    return lss.create({
      ...data,
      quarters: [
        {
          expenses: [],
          revenues: [],
        },
        {
          expenses: [],
          revenues: [],
        },
        {
          expenses: [],
          revenues: [],
        },
        {
          expenses: [],
          revenues: [],
        },
      ],
    });
  },

  getAllAsArray() {
    return lss.getAllAsArray();
  },

  getById(id: string) {
    return lss.getById(id);
  },
};

export default ProjectService;
