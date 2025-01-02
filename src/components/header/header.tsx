"use client";

import MainNav from "@/features/nav/mainNav";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { WithLocale } from "@/types";
import SettingsIcon from "@mui/icons-material/Settings";
import cx from "classnames";
import { useMemo, useState } from "react";
import { IconButton } from "../button/icon";
import { Flyout } from "../flyout";
import { Link } from "../link";
import { Headline } from "../text";
import styles from "./header.module.css";
import Logo from "./icons/logo";
import { Settings } from "./settings";

/**
 * Lazy translations
 */
const translations = {
  en: {
    settings: "Settings",
  },
  pt: {
    settings: "Configurações",
  },
};

/**
 * Main navigation component
 */
const Header: React.FC<WithLocale> = ({ locale }) => {
  const keys = translations[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // memoize functions to prevent memory leaks
  const [handleScrollUp, handleScrollDown] = useMemo(
    () => [() => setIsHidden(false), () => setIsHidden(true)],
    [setIsHidden]
  );

  // Use scroll direction to fade the Header in or out
  useScrollDirection({
    onScrollUp: handleScrollUp,
    onScrollDown: handleScrollDown,
  });

  const handleClickSettingsBtn = () => {
    // add transition class to body for fancy theme changes
    document.documentElement.classList.add("animateAll");
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    // remove flashy class from body
    document.documentElement.classList.remove("animateAll");
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={cx(styles.header, {
          [styles.hidden]: isHidden,
        })}
      >
        <div className={styles.content}>
          <div className={styles.main}>
            <Link href={`/${locale}`}>
              <Headline level={3} className={styles.headline}>
                <Logo />
              </Headline>
            </Link>
            <div className={cx("centered", styles.outliers)}>
              <MainNav locale={locale} />
              <IconButton
                size={1}
                aria-label={keys.settings}
                onClick={handleClickSettingsBtn}
              >
                <SettingsIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </header>
      {/* Settings flyout */}
      <Flyout
        isOpen={isOpen}
        label={keys.settings}
        onCloseClick={handleCloseClick}
      >
        <Settings />
      </Flyout>
    </>
  );
};

export default Header;
