import { Headline } from "@/components/text";
import useLocale from "@/hooks/useLocale";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import SettingsSystemDaydream from "@mui/icons-material/SettingsSystemDaydream";
import cx from "classnames";
import { useEffect, useState } from "react";
import IconButton from "../icon/iconButton";
import styles from "./themeButton.module.css";

const THEME_KEY = "theme";

const darkModelCssClass: Theme = "dark";
const lightModelCssClass: Theme = "light";

type Theme = "dark" | "light" | "system";

const getStoredTheme = (): Theme => {
  let config: Theme = "system";

  if (typeof localStorage !== "undefined") {
    config = (localStorage.getItem(THEME_KEY) as Theme) || config;
  }

  return config;
};

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  const locale = useLocale();
  const isDarkTheme = theme === "dark";
  const isLightTheme = theme === "light";
  const isSystemTheme = theme === "system";

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove(lightModelCssClass);
      document.documentElement.classList.add(darkModelCssClass);
    } else if (theme === "light") {
      document.documentElement.classList.remove(darkModelCssClass);
      document.documentElement.classList.add(lightModelCssClass);
    } else {
      document.documentElement.classList.remove(darkModelCssClass);
      document.documentElement.classList.remove(lightModelCssClass);
    }
  }, [theme]);

  /**
   * Remove key from local storage when user picks OS theme
   */
  const handleSystemClick = () => {
    setTheme("system");
    localStorage.removeItem(THEME_KEY);
  };

  const handleLightClick = () => {
    setTheme("light");
    localStorage.setItem(THEME_KEY, "light");
  };

  const handleDarkClick = () => {
    setTheme("dark");
    localStorage.setItem(THEME_KEY, "dark");
  };

  return (
    <>
      <Headline className="m-b-24" level={4}>
        Theme
      </Headline>
      <div className={styles.themeButton}>
        <IconButton
          alt
          onClick={handleLightClick}
          level={isLightTheme ? 1 : 0}
          className={cx(styles.firstButton, {
            [styles.active]: isLightTheme,
            [styles.noRightBorder]: isSystemTheme,
          })}
          label="Light"
          suppressHydrationWarning
        >
          <LightMode />
        </IconButton>
        <IconButton
          alt
          level={isSystemTheme ? 1 : 0}
          onClick={handleSystemClick}
          className={cx(styles.middleButton, {
            [styles.active]: isSystemTheme,
            [styles.noLeftBorder]: isLightTheme || isDarkTheme,
            [styles.noRightBorder]: isLightTheme || isDarkTheme,
          })}
          label="System"
        >
          <SettingsSystemDaydream />
        </IconButton>
        <IconButton
          alt
          onClick={handleDarkClick}
          level={isDarkTheme ? 1 : 0}
          className={cx(styles.lastButton, {
            [styles.active]: isDarkTheme,
            [styles.noLeftBorder]: isSystemTheme,
          })}
          label="Dark"
        >
          <DarkMode />
        </IconButton>
      </div>
    </>
  );
};

export default ThemeButton;
