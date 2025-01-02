import useLocale from "@/hooks/useLocale";
import CloseIcon from "@mui/icons-material/Close";
import cx from "classnames";
import { IconButton } from "../button/icon";
import { Text } from "../text";
import styles from "./flyout.module.css";

export type FlyoutProps = {
  label: string;
  isOpen: boolean;
  onCloseClick: () => void;
  children: React.ReactNode;
};

const translations = {
  en: {
    close: "Close",
  },
  pt: {
    close: "Fechar",
  },
};

const Flyout: React.FC<FlyoutProps> = ({
  label,
  isOpen,
  children,
  onCloseClick,
}) => {
  const locale = useLocale();
  const keys = translations[locale];

  return (
    <section
      className={cx(styles.flyout, {
        [styles.isOpen]: isOpen,
      })}
    >
      <div
        className={cx(styles.flyoutInner, {
          [styles.isOpen]: isOpen,
        })}
      >
        <div className={styles.header}>
          <Text>{label}</Text>
          <IconButton size={1} label={keys.close} onClick={onCloseClick}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={cx(styles.flyoutContentWrapper)}>
          <div className={styles.flyoutContent}>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Flyout;
