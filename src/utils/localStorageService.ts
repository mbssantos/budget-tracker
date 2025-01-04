import { encode } from "./base64";

type LocalStorageMap<T> = {
  [key: string]: T;
};

/**
 * params created by this class
 */
type K = {
  id: string;
  createdAt: number;
};

/**
 * General purpose local storage wrapper.
 * Used in place of a DB connector
 */
export class LocalStorageService<T extends K> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  /**
   * Check if the key exists in local storage
   */
  exists() {
    return localStorage.getItem(this.storageKey) !== null;
  }

  count() {
    return this.getAllAsArray().length;
  }

  /**
   * Create a new entry of the given type
   * @param data
   * @returns
   */
  create(...data: Omit<T, "id" | "createdAt">[]) {
    // insert all items
    return data.map((entry) => {
      // real DBs would use UUIDs or some such
      const id = encode(`${Math.random()}`);

      return this.upsert(id, { id, createdAt: Date.now(), ...entry } as T);
    });
  }

  /**
   * Update or create an entry if doesn't exist
   *
   * @param id the id of the item to update
   * @param update the data to save
   * @returns the updated entry
   */
  upsert(id: string, update: Partial<T>) {
    const items = this.getAll();

    items[id] = {
      ...items[id],
      ...update,
    };

    localStorage.setItem(this.storageKey, JSON.stringify(items));

    return items[id];
  }

  getAll(): LocalStorageMap<T> {
    try {
      // handle server-side calls
      if (typeof localStorage === "undefined") {
        return {};
      }

      return JSON.parse(localStorage?.getItem(this.storageKey) || "{}");
    } catch (e) {
      console.error(`Error parsing saved answers`, e);
      return {};
    }
  }

  getAllAsArray(): T[] {
    return Object.values(this.getAll());
  }

  /**
   * Return an entry by id
   *
   * @param id
   * @param throwOnNull throws and exception if the fetched value is null
   * @returns the entry or undefined
   */
  getById(id: string, throwOnNull?: boolean) {
    const all = this.getAll();
    const entry = all[id];

    if (!entry && throwOnNull) {
      throw new Error(`entry with id ${id} not found`);
    }

    return entry as T;
  }

  purge() {
    localStorage.removeItem(this.storageKey);
  }
}
