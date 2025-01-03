import { LocalStorageService } from "@/utils/localStorageService";
import { Tag } from "./types";

const proposedTags = ["consultancy", "licenses", "operations", "travel"];

const defaultTags: Tag[] = proposedTags.map((label) => ({
  id: label,
  label,
  createdAt: Date.now(),
}));

const LOCAL_STORAGE_KEY = "tags";

// Shallow copy defaults
const lss = new LocalStorageService<Tag>(LOCAL_STORAGE_KEY);

// if we're browse-side and add the list does not exist, add the default items
if (typeof window !== "undefined" && !lss.exists()) {
  lss.create(...defaultTags);
}

const TagService = {
  create(label: string) {
    return lss.create({ label });
  },

  search(dirtyNeedle: string, limit = 5) {
    const needle = dirtyNeedle.toLocaleLowerCase();
    const allEntries = lss.getAllAsArray();

    // match ids and labels to search terms
    return allEntries
      .filter(
        ({ id, label }) =>
          id.toLocaleLowerCase().includes(needle) ||
          label.toLocaleLowerCase().includes(needle)
      )
      .splice(0, limit);
  },
};

export default TagService;
