import { encode } from "./base64";

/**
 * Generates a base64-encoded Id
 *
 * @param id an optional value to encode
 * @returns
 */
export const generateId = (id?: string | number) => {
  return encode(`${id || Math.random()}`);
};
