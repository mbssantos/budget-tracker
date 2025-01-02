/**
 * Decode a base 64 string
 *
 * @param str
 * @returns
 */
export const decode = (str: string): string =>
  Buffer.from(str, "base64").toString("binary");

/**
 * Encode a string to base 64
 *
 * @param str
 * @returns
 */
export const encode = (str: string): string =>
  Buffer.from(str, "binary").toString("base64");
