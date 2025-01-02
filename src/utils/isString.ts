export default function isString(variable: unknown): variable is string {
  return typeof variable === "string";
}
