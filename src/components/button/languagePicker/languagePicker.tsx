import { Link } from "@/components/link";
import { Headline } from "@/components/text";
import { Locale } from "@/types";
import { getOppositeLocale } from "@/utils/getOppositeLocale";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../button";
import styles from "./languagePicker.module.css";

const getLocaleAndPathname = (
  pathname: string
): { locale: Locale; pathname: string } => {
  const defaultLocale: Locale = "en";
  const defaultPathname = "/";

  const [_, locale, ...rest] = pathname.split("/");
  const pathnameWithoutLocale = `/${rest.join("/")}`;

  return {
    locale: (locale as Locale) || defaultLocale,
    pathname: pathnameWithoutLocale || defaultPathname,
  };
};

const findHrefLang = (locale: Locale) => {
  if (typeof document !== "undefined") {
    const altLocale = getOppositeLocale(locale);
    const links = document.getElementsByTagName("link");

    for (const link of links) {
      if (link.getAttribute("hreflang") === altLocale) {
        const href = link.getAttribute("href");
        if (!href || href.length === 0) {
          return;
        }

        // convert a full url to an local href
        const [_, hrefWithoutLocale] = href.split(`/${altLocale}/`);
        return `/${altLocale}/${hrefWithoutLocale}`;
      }
    }
  }
};

const LanguagePicker: React.FC = () => {
  const routePathname = usePathname();
  const { locale, pathname } = getLocaleAndPathname(routePathname);
  const altLocale = getOppositeLocale(locale);
  const [redirectUrl, setRedirectUrl] = useState(`/${altLocale}${pathname}`);

  const isPt = locale === "pt";
  const isEn = locale === "en";

  const ptUrl = isPt ? `/pt${pathname}` : redirectUrl;
  const enUrl = isEn ? `/en${pathname}` : redirectUrl;

  useEffect(() => {
    // pick redirect URL from hreflang
    const hreflang = findHrefLang(locale);
    const path = `/${altLocale}${pathname}`;
    const url = hreflang ? hreflang : path;

    setRedirectUrl(url);
  }, [pathname, routePathname]);

  return (
    <>
      <Headline className={styles.headline} level={4}>
        <span>Language</span>
        <span>~</span>
        <span>Lingua</span>
      </Headline>
      <div className={styles.languageButton}>
        <Link href={enUrl}>
          <Button
            level={isEn ? 1 : 0}
            className={cx(styles.firstButton, {
              [styles.active]: isEn,
              [styles.noRightBorder]: !isEn,
            })}
          >
            English
          </Button>
        </Link>
        <Link href={ptUrl}>
          <Button
            level={isPt ? 1 : 0}
            className={cx(styles.lastButton, {
              [styles.active]: isPt,
              [styles.noLeftBorder]: !isPt,
            })}
          >
            Português
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LanguagePicker;
