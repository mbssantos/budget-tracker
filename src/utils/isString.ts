/**
 * Assert a given variable is a string. useful to reduce typescript verbosity
 *
 * @param variable
 * @returns
 */
export default function isString(variable: unknown): variable is string {
  return typeof variable === "string";
}
