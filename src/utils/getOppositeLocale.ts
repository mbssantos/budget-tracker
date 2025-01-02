import { Locale } from "@/types";

export const getOppositeLocale = (locale: Locale | string): Locale => {
  return locale === "pt" ? "en" : "pt";
};
