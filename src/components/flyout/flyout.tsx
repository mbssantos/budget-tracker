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

const Flyout: React.FC<FlyoutProps> = ({
  label,
  isOpen,
  children,
  onCloseClick,
}) => {
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
          <IconButton size={1} label="Close" onClick={onCloseClick}>
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
