import { Locale } from "@/types";
import { usePathname } from "next/navigation";

const getLocaleFromPathname = (pathname = "") => {
  const defaultLocale: Locale = "en";

  const [_, locale] = pathname.split("/");

  if (locale === "pt") {
    return locale;
  }

  return defaultLocale;
};

const useLocale = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return locale;
};

export default useLocale;
